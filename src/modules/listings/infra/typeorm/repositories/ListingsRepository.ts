import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository'
import { getRepository, Repository } from 'typeorm'
import { Listing } from '../entities/Listing'

class ListingsRepository implements IListingsRepository {
  private repository: Repository<Listing>
  private productsRepository: ProductsRepository

  constructor() {
    this.repository = getRepository(Listing)
    this.productsRepository = new ProductsRepository()
  }

  async getAll(account_id: string): Promise<Listing[]> {
    const query = this.repository.createQueryBuilder('listings')

    query.innerJoinAndSelect('listings.integration', 'integrations')

    query.innerJoinAndSelect('listings.account', 'accounts')

    query.innerJoinAndSelect('listings.products', 'products')

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
    products_id: string[]
    parent_code?: string
  }): Promise<Listing> {
    let listing = this.repository.create()

    Object.assign(listing, { ...data })

    listing = await this.repository.save(listing)
    const products = await this.productsRepository.findByIds({
      ids: data.products_id,
    })

    listing.products = products
    await this.repository.save(listing)

    return listing
  }

  async delete(account_id: string, id: string): Promise<void> {
    await this.repository.delete({ id, account_id })
  }

  async findByCode(code: string): Promise<Listing> {
    const listing = await this.repository.findOne({
      where: {
        code,
      },
    })
    return listing
  }

  async findByParentCode(
    parent_code: string,
    options?: { relations: string[] }
  ): Promise<Listing[]> {
    const listings = await this.repository.find({
      where: {
        parent_code,
      },
      relations: options.relations,
    })
    return listings
  }

  async getByProductId(id: string, account_id: string): Promise<Listing[]> {
    const listings = await this.repository.find({
      where: {
        product_id: id,
        account_id,
      },
    })

    return listings
  }
}

export { ListingsRepository }
