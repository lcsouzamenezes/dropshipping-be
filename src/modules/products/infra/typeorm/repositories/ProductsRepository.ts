import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import {
  IProductsRepository,
  SaveManyResponse,
} from '@modules/products/repositories/IProductsRepository'
import { getConnection, getRepository, Repository } from 'typeorm'
import { Product } from '../entities/Product'

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>

  constructor() {
    this.repository = getRepository(Product)
  }

  async save({ images, ...data }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create()

    await this.repository.save(data)

    return product
  }

  async saveMany(
    products: Product[],
    update = false
  ): Promise<SaveManyResponse> {
    const errors: SaveManyResponse['errors'] = []
    let savedProducts = 0

    const { manager } = this.repository

    await manager.transaction(async (entityManager) => {
      await Promise.all(
        products.map(async (product) => {
          if (!product.sku) {
            errors.push({
              message: `Product ${product.name} has no SKU`,
              code: 'invalid_sku',
            })
            return
          }

          const productExist = await entityManager.findOne(Product, {
            where: {
              account_id: product.account_id,
              sku: product.sku,
            },
          })
          if (productExist) {
            if (update) {
              product.id = productExist.id
            } else {
              errors.push({
                message: `Product with SKU "${product.sku}" already exists`,
                code: 'sku_already_exists',
              })
              return
            }
          }
          await entityManager.save(product)
          savedProducts++
        })
      )
    })

    return { products: savedProducts, errors }
  }

  async getAll(
    account_id: string,
    options?: { relations?: [] }
  ): Promise<Product[]> {
    const products = await this.repository
      .createQueryBuilder('products')
      .where('account_id = :account_id', { account_id })
      .paginate()
    return products
  }
}

export { ProductsRepository }
