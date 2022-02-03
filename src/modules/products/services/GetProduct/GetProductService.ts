import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    product_id,
    options,
  }: {
    product_id: string
    options?: any
  }): Promise<Product> {
    const product = await this.productsRepository.findById({
      id: product_id,
      options,
    })

    return product
  }
}

export { GetProductService }
