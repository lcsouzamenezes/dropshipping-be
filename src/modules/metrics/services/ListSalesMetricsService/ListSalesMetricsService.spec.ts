import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { SalesRepository } from '@modules/sales/repositories/in-memory/SalesRepository'
import { ListSalesMetricsService } from './ListSalesMetricsService'

describe('ListSalesMetricsService', () => {
  let accountsRepository = new AccountsRepository()
  let salesRepository: SalesRepository
  let listSalesMetricsService: ListSalesMetricsService

  beforeEach(() => {
    salesRepository = new SalesRepository()
    listSalesMetricsService = new ListSalesMetricsService(salesRepository)
  })

  it('should be able to list sales metrics', async () => {
    const account = await accountsRepository.create({
      name: 'Test',
      company: 'Test Company',
      email: 'azohivut@bu.ai',
      password: '123456',
    })

    salesRepository.create({
      account_id: account.id,
      integration_order_id: '123',
      quantity: 1,
      listing_id: '123',
    })

    salesRepository.create({
      account_id: account.id,
      integration_order_id: '123s',
      quantity: 2,
      listing_id: '12a3',
    })

    const sales = await listSalesMetricsService.execute(account.id)

    expect(sales).toHaveLength(2)
  })
})
