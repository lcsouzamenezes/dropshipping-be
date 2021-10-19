import {
  ICreate,
  IIntegrationsRepository,
} from '@modules/integrations/repositories/IIntegrationsRepository'
import { getRepository, Repository } from 'typeorm'
import { Integration } from '../entities/Integration'

class IntegrationsRepository implements IIntegrationsRepository {
  private repository: Repository<Integration>

  constructor() {
    this.repository = getRepository(Integration)
  }

  async create(data: ICreate, account_id: string): Promise<Integration> {
    const integration = this.repository.create()
    Object.assign(integration, { ...data, account_id })
    await this.repository.save(integration)

    return integration
  }

  async findByUserId(
    user_id: string,
    account_id: string
  ): Promise<Integration> {
    const integration = await this.repository.findOne({
      where: {
        user_id,
        account_id,
      },
    })

    return integration
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByAccountId(account_id: string): Promise<Integration[]> {
    const integrations = await this.repository.find({
      where: {
        account_id,
      },
    })

    return integrations
  }
}

export { IntegrationsRepository }
