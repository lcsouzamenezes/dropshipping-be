import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListSalesMetricsService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) {}

  async execute(account_id: string): Promise<any> {
    const sales = await this.salesRepository.getCurrentMonthSales(account_id)

    const metrics = {
      salesCount: sales.length,
    }

    return metrics
  }
}

export { ListSalesMetricsService }
