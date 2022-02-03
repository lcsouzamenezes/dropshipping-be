import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import {
  findByIdData,
  findByIntegrationProductCodeData,
  findBySkuData,
  IProductsRepository,
  SaveManyResponse,
} from '@modules/products/repositories/IProductsRepository'
import { Brackets, getRepository, QueryResult, Repository } from 'typeorm'
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
    const query = this.repository.createQueryBuilder('products')

    query
      .where('account_id = :account_id', { account_id })
      .orderBy('created_at', 'DESC')
      .orderBy('name', 'ASC')
      .orderBy('CASE WHEN stock > 0 THEN 1 ELSE 2 END', 'ASC')

    const products = await query.paginate()
    return products
  }
  async search(
    { search, account_id }: { search: string; account_id: string },
    options?: { relations?: [] }
  ): Promise<Product[]> {
    const query = this.repository
      .createQueryBuilder('products')
      .where('account_id = :account_id', { account_id })
      .where((qb) => {
        qb.where('name LIKE :search', { search: `%${search}%` })
        qb.orWhere('sku LIKE :search', { search: `%${search}%` })
        qb.orWhere('ean LIKE :search', { search: `%${search}%` })
      })
      .orderBy('created_at', 'DESC')
      .orderBy('name', 'ASC')
      .orderBy('CASE WHEN stock > 0 THEN 1 ELSE 2 END', 'ASC')

    const products = await query.paginate()
    return products
  }

  async findById({ id, options }: findByIdData): Promise<Product> {
    const product = await this.repository.findOne({
      where: [{ id }],
      ...options,
    })

    return product
  }

  async getAllFromSuppliers({
    search,
    supplier,
    images = true,
  }): Promise<Product[]> {
    const query = this.repository.createQueryBuilder('products')

    query.innerJoinAndSelect(
      'products.account',
      'accounts',
      'accounts.type = :type AND accounts.active = true',
      { type: 'supplier' }
    )

    if (images) {
      query.leftJoinAndSelect('products.images', 'images')
    }

    if (search) {
      const searchQuery = search.split(' ').join('%')
      query.andWhere((qb) => {
        qb.where('products.name LIKE :search', { search: `%${searchQuery}%` })
        qb.orWhere('products.sku = :sku', { sku: search })
        qb.orWhere('products.ean = :ean', { ean: search })
      })
    }

    if (supplier) {
      query.andWhere('accounts.id = :supplier', { supplier })
    }

    query.orderBy('products.created_at', 'DESC')
    query.orderBy('products.name', 'ASC')

    const products = await query.paginate()
    return products
  }

  async findByIntegrationProductCode({
    account_id,
    code,
  }: findByIntegrationProductCodeData): Promise<Product> {
    const product = await this.repository.findOne({
      where: {
        account_id,
        integration_product_code: code,
      },
    })
    return product
  }
}

export { ProductsRepository }
