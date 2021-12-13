import { IUpdateProductStockDTO } from '@modules/products/dtos/IUpdateProductStockDTO'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateStockService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute({
    code,
    stock,
    account_id,
  }: IUpdateProductStockDTO): Promise<Product> {
    const product = await this.productsRepository.findByIntegrationProductCode({
      code,
      account_id,
    })

    if (!product) {
      throw new AppError(
        'Product not found.',
        'update_stock:product_not_found',
        404
      )
    }

    Object.assign(product, {
      stock,
    })

    await this.productsRepository.save(product)

    return product
  }
}
