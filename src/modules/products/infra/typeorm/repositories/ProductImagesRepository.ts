import { ICreateProductImageDTO } from '@modules/products/dtos/ICreateProductImageDTO'
import { IProducImageRepository } from '@modules/products/repositories/IProducImageRepository'
import { getRepository, Repository } from 'typeorm'
import { ProductImage } from '../entities/ProductImage'

class ProductImagesRepository implements IProducImageRepository {
  private repository: Repository<ProductImage>

  constructor() {
    this.repository = getRepository(ProductImage)
  }

  async getByProductId(product_id: string): Promise<ProductImage[]> {
    const images = await this.repository.find({
      where: {
        product_id,
      },
    })

    return images
  }

  async save(data: ICreateProductImageDTO): Promise<ProductImage> {
    const image = this.repository.create({
      ...data,
    })

    await this.repository.save(image)

    return image
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async deleteAllByProductId(id: string): Promise<void> {
    await this.repository.delete({ product_id: id })
  }
}

export { ProductImagesRepository }
