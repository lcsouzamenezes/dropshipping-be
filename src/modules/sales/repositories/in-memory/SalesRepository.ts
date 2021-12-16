import { ISalesRepository } from '../ISalesRepository'
import { CreateSellDTO } from '@modules/sales/dtos/CreateSellDTO'
import { Sell } from '@modules/sales/infra/typeorm/entities/Sell'

export class SalesRepository implements ISalesRepository {
  private sales: Sell[] = []

  async create(data: CreateSellDTO): Promise<Sell> {
    const sell = new Sell()
    Object.assign(sell, data)
    this.sales.push(sell)
    return sell
  }

  async getByAccountId(account_id: string): Promise<Sell[]> {
    const sales = this.sales.filter((sell) => sell.account_id === account_id)
    return sales
  }

  async getByIntegrationOrderId(id: string): Promise<Sell> {
    return this.sales.find((sell) => sell.integration_order_id === id)
  }

  async delete(id: string): Promise<void> {
    this.sales = this.sales.filter((sell) => sell.id !== id)
  }
}
