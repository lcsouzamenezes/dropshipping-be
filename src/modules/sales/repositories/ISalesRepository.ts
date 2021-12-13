import { CreateSellDTO } from '../dtos/CreateSellDTO'
import { Sell } from '../infra/typeorm/entities/Sell'

export interface ISalesRepository {
  create(data: CreateSellDTO): Promise<Sell>

  getByAccountId(account_id: string): Promise<Sell[]>

  getByIntegrationOrderId(id: string): Promise<Sell>
}
