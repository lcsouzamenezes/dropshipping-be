import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import {
  findByIdData,
  findByIntegrationProductCodeData,
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

    this.products.push(product)

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

  async findById(data: findByIdData): Promise<Product> {
    const product = this.products.find(
      (product) =>
        product.id == data.id && product.account_id == data.account_id
    )
    return product
  }

  async getAllFromSuppliers(): Promise<Product[]> {
    const products = this.products.filter(
      (product) =>
        product.account?.type === 'supplier' && product.account?.active
    )
    return products
  }

  async findByIntegrationProductCode(
    data: findByIntegrationProductCodeData
  ): Promise<Product> {
    const product = this.products.find(
      (product) =>
        product.integration_product_code == data.code &&
        product.account_id === data.account_id
    )
    return product
  }
}

export { ProductsRepository }
