import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateComboListingService {
  constructor(
    @inject('ListingsRepository')
    private listingRepository: IListingsRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({ code, integration_id, products }) {
    console.log({ code, integration_id, products })
  }
}

export { CreateComboListingService }
