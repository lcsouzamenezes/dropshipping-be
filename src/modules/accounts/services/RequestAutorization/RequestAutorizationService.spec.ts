import { AccountSupplierAuthorization } from '@modules/accounts/infra/typeorm/entities/AccountSupplierAuthorization'
import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { AccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/in-memory/AccountsSuppliersAuthorizations'
import { RequestAutorizationService } from './RequestAutorizationService'

let accountsRepository: AccountsRepository
let accountsSuppliersAuthorizations: AccountsSuppliersAuthorizationsRepository
let requestAutorizationService: RequestAutorizationService

describe('RequestAutorizationService', () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository()
    accountsSuppliersAuthorizations =
      new AccountsSuppliersAuthorizationsRepository()
    requestAutorizationService = new RequestAutorizationService(
      accountsRepository,
      accountsSuppliersAuthorizations
    )
  })

  it('should be able to request autorization to supplier', async () => {
    const account = await accountsRepository.create({
      company: 'Google Inc',
      email: 'admin@google.com',
      name: 'Google Inc',
      password: '123456',
      active: true,
      type: 'seller',
    })

    const supplier = await accountsRepository.create({
      company: 'Microsoft',
      email: 'admin@microsoft',
      name: 'Microsoft Inc',
      password: '123432',
      type: 'supplier',
      active: true,
    })

    const supplierAuthorization = await requestAutorizationService.execute(
      account.id,
      supplier.id
    )
    expect(supplierAuthorization).toHaveProperty('id')
  })
})
