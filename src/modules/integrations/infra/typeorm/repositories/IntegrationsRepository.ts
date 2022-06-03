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

  async findByUserId(user_id: string): Promise<Integration[]> {
    const integrations = await this.repository.find({
      where: {
        user_id,
      },
    })

    return integrations
  }

  async findByUserIdAndAccountId(
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

  async findByAccountId(
    account_id: string,
    provider?: string
  ): Promise<Integration[]> {
    const integrationsQuery = this.repository
      .createQueryBuilder()
      .where('account_id = :account_id', { account_id })

    if (provider) {
      integrationsQuery.andWhere('provider = :provider', { provider })
    }

    const integrations = await integrationsQuery.getMany()

    return integrations
  }

  async findById(id: string, account_id?: string): Promise<Integration> {
    const query = this.repository.createQueryBuilder('integrations')

    query.where('integrations.id = :id', { id })

    if (account_id) {
      query.andWhere('integrations.account_id = :account_id', { account_id })
    }

    const integration = await query.getOne()

    return integration
  }

  async update(integration: Integration): Promise<Integration> {
    await this.repository.save(integration)
    return integration
  }
}

export { IntegrationsRepository }
