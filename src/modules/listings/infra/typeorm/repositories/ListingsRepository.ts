import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { DeleteResult, getRepository, Repository } from 'typeorm'
import { Listing } from '../entities/Listing'

class ListingsRepository implements IListingsRepository {
  private repository: Repository<Listing>

  constructor() {
    this.repository = getRepository(Listing)
  }

  async getAll(account_id: string): Promise<Listing[]> {
    const query = this.repository.createQueryBuilder('listings')

    query.innerJoinAndSelect('listings.integration', 'integrations')

    query.innerJoinAndSelect('listings.account', 'accounts')

    query.innerJoinAndSelect('listings.product', 'products')

    query.leftJoinAndSelect('products.images', 'images')

    query.where('listings.account_id = :account_id', { account_id })

    const listings = await query.paginate()

    return listings
  }

  async create(data: {
    code: string
    integration_id: string
    active: boolean
    account_id: string
    product_id: string
  }): Promise<Listing> {
    const listing = this.repository.create()

    Object.assign(listing, { ...data })

    await this.repository.save(listing)

    return listing
  }

  async delete(account_id: string, id: string): Promise<void> {
    await this.repository.delete({ id, account_id })
  }
}

export { ListingsRepository }
