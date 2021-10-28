import { Product } from '../infra/typeorm/entities/Product'

export interface SaveManyResponse {
  errors: Array<{
    message: string
    code: string
  }>
  products: number
}

interface IProductsRepository {
  saveMany(products: Product[], update?: boolean): Promise<SaveManyResponse>
}

export { IProductsRepository }
