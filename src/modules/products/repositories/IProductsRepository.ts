import { ICreateProductDTO } from '../dtos/ICreateProductDTO'
import { Product } from '../infra/typeorm/entities/Product'

export interface SaveManyResponse {
  errors: Array<{
    message: string
    code: string
  }>
  products: number
}

export interface findBySkuData {
  sku: string
  account_id: string
  integration_id?: string
}

interface IProductsRepository {
  save(data: ICreateProductDTO): Promise<Product>
  saveMany(products: Product[], update?: boolean): Promise<SaveManyResponse>
  getAll(account_id: string, options?: { relations?: [] }): Promise<Product[]>
  findBySku(data: findBySkuData): Promise<Product>
}

export { IProductsRepository }
