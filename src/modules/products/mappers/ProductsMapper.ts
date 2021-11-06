import { productDTO } from '../dtos/ProductDTO'
import { Product } from '../infra/typeorm/entities/Product'

class ProductsMapper {
  static toDTO(product: Product): productDTO {
    return {
      ...product,
    }
  }
}

export { ProductsMapper }
