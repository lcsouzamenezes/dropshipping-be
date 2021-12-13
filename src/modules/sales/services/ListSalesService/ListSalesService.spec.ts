import { SalesRepository } from '@modules/sales/repositories/in-memory/SalesRepository'
import { ListSalesService } from './ListSalesService'

let salesRepository: SalesRepository
let listSalesService: ListSalesService

describe('ListSalesService', () => {
  beforeEach(() => {
    salesRepository = new SalesRepository()
    listSalesService = new ListSalesService(salesRepository)
  })

  it('should be able to list account sales', async () => {
    const account_id = 'hPjz3SBdKzIzuBpuC621FSUqXCr4mhed'

    for (let i = 0; i < 2; i++) {
      await salesRepository.create({
        account_id,
        integration_order_id: 'vxzDOPCSOXXtPxc3bYED7FpoIoY4HVXI' + i,
        listing_id: 'jozphQUTMvZt88nQtbydTxv45FQ7wfp1' + i,
        quantity: Math.floor(Math.random() * 10),
      })
    }

    await salesRepository.create({
      account_id: '0eV0Zuy9ZMHVoSY4AeqC98ddBop350ew',
      integration_order_id: 'HtEPqxs6EqOLk9UrgCjs0HEjuHikbHtl',
      listing_id: '0fCOvHTlyVbV5ABth8abGhujKKxBWVBg',
      quantity: Math.floor(Math.random() * 10),
    })

    const sales = await listSalesService.execute(account_id)

    expect(sales).toHaveLength(2)
  })
})
