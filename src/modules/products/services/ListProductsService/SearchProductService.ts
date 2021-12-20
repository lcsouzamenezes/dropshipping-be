import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { injectable, inject } from 'tsyringe'

@injectable()
export class SearchProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(
    { search, account_id }: { search: string; account_id: string },
    page = 1
  ): Promise<Product[]> {
    const products = this.productsRepository.search({ account_id, search })

    return products
  }
}
