import { ICreateProductImageDTO } from '@modules/products/dtos/ICreateProductImageDTO'
import { ProductImage } from '@modules/products/infra/typeorm/entities/ProductImage'
import { IProducImageRepository } from '../IProducImageRepository'

class ProductImagesRepository implements IProducImageRepository {
  private images: ProductImage[] = []

  async getByProductId(product_id: string): Promise<ProductImage[]> {
    throw new Error('Method not implemented.')
  }

  async save(data: ICreateProductImageDTO): Promise<ProductImage> {
    const image = new ProductImage()

    Object.assign(image, {
      ...data,
    })

    this.images.push(image)
    return image
  }
}

export { ProductImagesRepository }
