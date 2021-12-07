import { Listing } from '@modules/listings/infra/typeorm/entities/Listing'
import { IListingsRepository } from '../IListingsRepository'

class ListingsRepository implements IListingsRepository {
  private listings: Listing[] = []

  async getAll(account_id: string): Promise<Listing[]> {
    const listings = this.listings.filter(
      (listing) => listing.account_id === account_id
    )
    return listings
  }

  async create(data: {
    code: string
    integration_id: string
    active: boolean
    account_id: string
  }): Promise<Listing> {
    const listing = new Listing()
    Object.assign(listing, { ...data })
    this.listings.push(listing)
    return listing
  }
}

export { ListingsRepository }
