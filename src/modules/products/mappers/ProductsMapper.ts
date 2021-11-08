import { productDTO } from '../dtos/ProductDTO'
import { Product } from '../infra/typeorm/entities/Product'

class ProductsMapper {
  static toDTO({ images, ...rest }: Product): productDTO {
    const product = {
      ...rest,
      price: rest.price / 100,
      stock: Number(rest.stock),
    } as productDTO

    if (images) {
      product.images = images.map(({ product_id, ...image }) => ({
        ...image,
      }))
    }

    return product
  }
}

export { ProductsMapper }
