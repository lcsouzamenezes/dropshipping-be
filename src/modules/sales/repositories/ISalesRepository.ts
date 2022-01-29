import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { ICreateSellDTO } from '../dtos/ICreateSellDTO'
import { IUpdateSellDTO } from '../dtos/IUpdateSellDTO'
import { Sell } from '../infra/typeorm/entities/Sell'

export interface ISalesRepository {
  create(data: ICreateSellDTO): Promise<Sell>

  getById(id: string): Promise<Sell>

  getByAccountId(account_id: string): Promise<Sell[]>

  getByIntegrationOrderId(id: string): Promise<Sell>

  delete(id: string): Promise<void>

  getSupplierIntegration(id: string): Promise<Integration>

  getSellProduct(id: string): Promise<Product>

  update(data: IUpdateSellDTO): Promise<Sell>
}
