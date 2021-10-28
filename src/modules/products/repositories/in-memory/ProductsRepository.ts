import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '../IProductsRepository'

class ProductsRepository implements IProductsRepository {
  private products: Product[] = []

  async saveMany(products: Product[]): Promise<void> {
    this.products.concat(products)
  }
}

export { ProductsRepository }
