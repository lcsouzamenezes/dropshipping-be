import { ICreateProductImageDTO } from '@modules/products/dtos/ICreateProductImageDTO'
import { ProductImage } from '@modules/products/infra/typeorm/entities/ProductImage'
import { IProducImageRepository } from '@modules/products/repositories/IProducImageRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateProductImageService {
  constructor(
    @inject('ProductImagesRepository')
    private productImagesRepository: IProducImageRepository
  ) {}

  async execute(data: ICreateProductImageDTO): Promise<ProductImage> {
    const image = await this.productImagesRepository.save(data)

    return image
  }
}

export { CreateProductImageService }
