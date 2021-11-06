import { ICreateProductDTO } from '../dtos/ICreateProductDTO'
import { Product } from '../infra/typeorm/entities/Product'

export interface SaveManyResponse {
  errors: Array<{
    message: string
    code: string
  }>
  products: number
}

interface IProductsRepository {
  save(data: ICreateProductDTO): Promise<Product>
  saveMany(products: Product[], update?: boolean): Promise<SaveManyResponse>
  getAll(account_id: string, options?: { relations?: [] }): Promise<Product[]>
}

export { IProductsRepository }
