import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(data: Omit<ICreateProductDTO, 'images'>) {
    const productExists = await this.productsRepository.findBySku({
      sku: data.sku,
      account_id: data.account_id,
      integration_id: data.integration_id,
    })

    if (productExists) {
      throw new AppError('SKU already in use', 'create_product:sku_in_use', 400)
    }

    const product = await this.productsRepository.save(data)

    return product
  }
}

export { CreateProductService }
