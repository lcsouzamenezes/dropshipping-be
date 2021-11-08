import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import {
  findBySkuData,
  IProductsRepository,
  SaveManyResponse,
} from '../IProductsRepository'

class ProductsRepository implements IProductsRepository {
  private products: Product[] = []

  async findBySku({
    sku,
    account_id,
    integration_id,
  }: findBySkuData): Promise<Product> {
    const product = this.products.find((product) => {
      if (product.sku != sku && product.account_id != account_id) {
        return false
      }

      if (integration_id && product.integration_id !== integration_id) {
        return false
      }

      return true
    })

    return product
  }

  async save(data: ICreateProductDTO): Promise<Product> {
    const product = new Product()

    const { images } = data
    delete data['images']

    //create images

    Object.assign(product, {
      ...data,
    })

    return product
  }

  async saveMany(
    products: Product[],
    update?: boolean
  ): Promise<SaveManyResponse> {
    this.products = this.products.concat(products)

    return {
      errors: [],
      products: products.length,
    }
  }

  async getAll(
    account_id: string,
    options?: { relations?: [] }
  ): Promise<Product[]> {
    const products = this.products.filter(
      (product) => product.account_id == account_id
    )

    return products
  }
}

export { ProductsRepository }
