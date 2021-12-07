import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { getRepository, Repository } from 'typeorm'
import { Listing } from '../entities/Listing'

class ListingsRepository implements IListingsRepository {
  private repository: Repository<Listing>

  constructor() {
    this.repository = getRepository(Listing)
  }

  async create(data: {
    code: string
    integration_id: string
    active: boolean
    account_id: string
  }): Promise<Listing> {
    const listing = this.repository.create()

    Object.assign(listing, { ...data })

    await this.repository.save(listing)

    return listing
  }
}

export { ListingsRepository }
