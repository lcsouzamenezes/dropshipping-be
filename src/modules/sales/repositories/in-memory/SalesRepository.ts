import { ISalesRepository } from '../ISalesRepository'
import { CreateSellDTO } from '@modules/sales/dtos/CreateSellDTO'
import { Sell } from '@modules/sales/infra/typeorm/entities/Sell'
import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { Product } from '@modules/products/infra/typeorm/entities/Product'

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

  async getSupplierIntegration(id: string): Promise<Integration> {
    const sell = this.sales.find((sell) => sell.id === id)
    const integration = sell.listing.product.integration
    return integration
  }
  async getSellProduct(id: string): Promise<Product> {
    const sell = this.sales.find((sell) => sell.id === id)
    const product = sell.listing.product
    return product
  }
}
