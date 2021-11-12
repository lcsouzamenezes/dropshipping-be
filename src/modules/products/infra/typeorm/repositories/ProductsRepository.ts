import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import {
  findByIdData,
  findBySkuData,
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

  async findBySku({
    sku,
    account_id,
    integration_id,
  }: findBySkuData): Promise<Product> {
    const query = this.repository.createQueryBuilder()
    query.where('sku = :sku AND account_id = :account_id', { sku, account_id })
    if (integration_id) {
      query.andWhere('integration_id = :integration_id', { integration_id })
    }
    const product = await query.getOne()
    return product
  }

  async save({ images, ...data }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({ ...data })

    await this.repository.save(product)

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
      .orderBy('created_at', 'DESC')
      .paginate()
    return products
  }

  async findById({ account_id, id, options }: findByIdData): Promise<Product> {
    const product = await this.repository.findOne({
      where: [{ account_id, id }],
      ...options,
    })

    return product
  }
}

export { ProductsRepository }
