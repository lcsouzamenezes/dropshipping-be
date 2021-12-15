import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { CreateSellDTO } from '@modules/sales/dtos/CreateSellDTO'
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository'
import { getRepository, Repository } from 'typeorm'
import { Sell } from '../entities/Sell'

export class SalesRepository implements ISalesRepository {
  private repository: Repository<Sell>

  constructor() {
    this.repository = getRepository(Sell)
  }

  async create(data: CreateSellDTO): Promise<Sell> {
    const sell = this.repository.create()
    Object.assign(sell, { ...data } as Sell)
    await this.repository.save(sell)
    return sell
  }

  async getByAccountId(account_id: string): Promise<Sell[]> {
    // const sales = await this.repository.find({
    //   where: {
    //     account_id,
    //   },
    // })

    const query = this.repository.createQueryBuilder('sales')

    query.leftJoinAndSelect('sales.account', 'accounts')
    query.leftJoinAndSelect('sales.listing', 'listings')
    query.leftJoinAndSelect('listings.integration', 'integration')
    query.leftJoinAndSelect('listings.product', 'product')

    query.orderBy('sales.created_at', 'DESC')

    const sales = await query.paginate()

    return sales
  }

  async getByIntegrationOrderId(id: string): Promise<Sell> {
    const sell = await this.repository.findOne({
      where: {
        integration_order_id: id,
      },
    })

    return sell
  }
}
