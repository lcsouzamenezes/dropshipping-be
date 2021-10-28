import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { ICreate, IIntegrationsRepository } from '../IIntegrationsRepository'

class IntegrationsRepository implements IIntegrationsRepository {
  private integrations: Integration[] = []

  async create(data: ICreate, account_id: string): Promise<Integration> {
    const mercadoLivreAccount = new Integration()
    Object.assign(mercadoLivreAccount, { ...data, account_id })
    this.integrations.push(mercadoLivreAccount)
    return mercadoLivreAccount
  }

  async findByUserId(
    user_id: string,
    account_id: string
  ): Promise<Integration> {
    const integration = this.integrations.find(
      (integration) =>
        integration.user_id === user_id && integration.account_id === account_id
    )
    return integration
  }

  async deleteById(id: string): Promise<void> {
    this.integrations.filter((integration) => integration.id !== id)
  }

  async findByAccountId(
    account_id: string,
    provider?: string
  ): Promise<Integration[]> {
    const integrations = this.integrations.filter((integration) => {
      if (integration.account_id === account_id) {
        if (provider && integration.provider !== provider) {
          return false
        }
        return true
      }
      return false
    })
    return integrations
  }

  async findById(id: string, account_id: string): Promise<Integration> {
    const integration = this.integrations.find(
      (integration) =>
        integration.id === id && integration.account_id === account_id
    )
    return integration
  }
}

export { IntegrationsRepository }
