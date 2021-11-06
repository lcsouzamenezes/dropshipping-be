import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { injectable, inject } from 'tsyringe'

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(account_id: string, page = 1): Promise<Product[]> {
    const products = this.productsRepository.getAll(account_id)

    return products
  }
}

export { ListProductsService }
