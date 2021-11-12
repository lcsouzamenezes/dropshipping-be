import { ICreateProductImageDTO } from '../dtos/ICreateProductImageDTO'
import { ProductImage } from '../infra/typeorm/entities/ProductImage'

interface IProducImageRepository {
  getByProductId(product_id: string): Promise<ProductImage[]>
  save(data: ICreateProductImageDTO): Promise<ProductImage>
  deleteById(id: string): Promise<void>
  deleteAllByProductId(id: string): Promise<void>
}

export { IProducImageRepository }
