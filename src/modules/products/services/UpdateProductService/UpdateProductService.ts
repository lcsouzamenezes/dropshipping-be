import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProductDTO'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProducImageRepository } from '@modules/products/repositories/IProducImageRepository'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ProductImagesRepository')
    private productImagesRepository: IProducImageRepository
  ) {}

  async execute({
    id,
    account_id,
    images,
    ...rest
  }: IUpdateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById({
      id,
      account_id,
    })

    if (!product) {
      throw new AppError('Product not found', 'update_product:not_found', 404)
    }

    if (images) {
      await this.productImagesRepository.deleteAllByProductId(product.id)
      for await (let image of images) {
        await this.productImagesRepository.save({
          url: image.url,
          is_external: image.is_external,
          product_id: product.id,
        })
      }
    }

    Object.assign(product, {
      ...rest,
      price: rest.price * 100,
    })

    const savedProduct = await this.productsRepository.save(product)

    return savedProduct
  }
}

export { UpdateProductService }
