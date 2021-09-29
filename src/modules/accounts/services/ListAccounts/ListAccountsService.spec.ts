import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { ListAccountsService } from './ListAccountsService'

let accountsRepository: AccountsRepository
let listAccountsService: ListAccountsService

describe('ListAccountsService', () => {
  beforeAll(() => {
    accountsRepository = new AccountsRepository()
    listAccountsService = new ListAccountsService(accountsRepository)
  })

  it('should be able to list accounts', async () => {
    const accounts = await listAccountsService.execute()
    expect(accounts).toEqual([])
  })
})
