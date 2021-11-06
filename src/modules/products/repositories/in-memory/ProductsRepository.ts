import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository, SaveManyResponse } from '../IProductsRepository'

class ProductsRepository implements IProductsRepository {
  private products: Product[] = []

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
