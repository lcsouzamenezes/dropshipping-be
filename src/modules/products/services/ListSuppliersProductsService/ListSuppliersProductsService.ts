import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListSuppliersProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(account_id: string): Promise<Product[]> {
    //TODO: use account_id to determine what suppliers has approved the user

    const products = await this.productsRepository.getAllFromSuppliers()

    return products
  }
}

export { ListSuppliersProductsService }
