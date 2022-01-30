import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { SalesRepository } from '@modules/sales/repositories/in-memory/SalesRepository'
import { ListSalesService } from './ListSalesService'

let accountsRepository: AccountsRepository
let salesRepository: SalesRepository
let listSalesService: ListSalesService

describe('ListSalesService', () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository()
    salesRepository = new SalesRepository()
    listSalesService = new ListSalesService(salesRepository, accountsRepository)
  })

  it('should be able to list account sales', async () => {
    const account = await accountsRepository.create({
      name: 'Test',
      company: 'Test Company',
      email: 'test@test.com',
      password: '12345678',
    })

    for (let i = 0; i < 2; i++) {
      await salesRepository.create({
        account_id: account.id,
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

    const sales = await listSalesService.execute(account.id)

    expect(sales).toHaveLength(2)
  })
})
