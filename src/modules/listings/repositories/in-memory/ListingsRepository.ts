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
    products_id: string[]
    parent_code?: string
  }): Promise<Listing> {
    const listing = new Listing()
    Object.assign(listing, { ...data })
    this.listings.push(listing)
    return listing
  }

  async delete(account_id: string, id: string): Promise<void> {
    const listings = this.listings.filter(
      (listing) => !(listing.id === id && listing.account_id === account_id)
    )

    this.listings = listings
  }

  async findByCode(code: string): Promise<Listing> {
    return this.listings.find((listing) => listing.code === code)
  }

  async findByParentCode(parent_code: string): Promise<Listing[]> {
    return this.listings.filter(
      (listing) => listing.parent_code === parent_code
    )
  }

  async getByProductId(id: string, account_id: string): Promise<Listing[]> {
    return this.listings.filter((listing) =>
      listing.products.find(
        (product) => product.id === id && product.account_id === account_id
      )
    )
  }
}

export { ListingsRepository }
