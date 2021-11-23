import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { ListSuppliersService } from './ListSuppliersService'

let accountsRepository: AccountsRepository
let listSuppliersService: ListSuppliersService

describe('ListSuppliers', () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository()
    listSuppliersService = new ListSuppliersService(accountsRepository)
  })

  it('should be able to list all suppliers from accounts', async () => {
    const suplier_id = 'V4d6wjffU44QBiwiPxgx3NHzYdKbXWMQ'

    const promises = []
    for (let i = 0; i < 3; i++) {
      promises.push(
        accountsRepository.create({
          name: 'Juan Howard ' + i,
          company: 'Juan Howard Comp ' + i,
          email: 'wauzeko' + i + '@kagvu.cx',
          password: 'WcEfgdS5rH8b',
          active: true,
          type: i < 2 ? 'supplier' : 'seller', //create one seller account
        })
      )
    }
    await Promise.all(promises)

    const suppliers = await listSuppliersService.execute(suplier_id)

    expect(suppliers).toHaveLength(2)
  })

  it('should not be able to list inactive supplier accounts', async () => {
    const suplier_id = 'V4d6wjffU44QBiwiPxgx3NHzYdKbXWMQ'

    const promises = []
    for (let i = 0; i < 3; i++) {
      promises.push(
        accountsRepository.create({
          name: 'Juan Howard ' + i,
          company: 'Juan Howard Comp ' + i,
          email: 'wauzeko' + i + '@kagvu.cx',
          password: 'WcEfgdS5rH8b',
          active: false,
          type: i < 2 ? 'supplier' : 'seller', //create one seller account
        })
      )
    }
    await Promise.all(promises)

    const suppliers = await listSuppliersService.execute(suplier_id)

    expect(suppliers).toHaveLength(0)
  })
})
