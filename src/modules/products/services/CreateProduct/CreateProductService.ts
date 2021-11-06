import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(data: ICreateProductDTO) {
    const product = await this.productsRepository.save(data)

    return product
  }
}

export { CreateProductService }
