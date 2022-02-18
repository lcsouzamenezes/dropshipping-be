import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { AccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/in-memory/AccountsSuppliersAuthorizations'
import { ListSuppliersAuthorizationsService } from './ListSuppliersAuthorizationsService'

let accountsRepository: AccountsRepository
let accountsSuppliersAuthorizationsRepository: AccountsSuppliersAuthorizationsRepository
let listSuppliersAuthorizations: ListSuppliersAuthorizationsService

describe('ListSuppliersAuthorizationsService', () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository()
    accountsSuppliersAuthorizationsRepository =
      new AccountsSuppliersAuthorizationsRepository()
    listSuppliersAuthorizations = new ListSuppliersAuthorizationsService(
      accountsSuppliersAuthorizationsRepository,
      accountsRepository
    )
  })

  it('should be able to list all authorizations from account', async () => {
    const account = await accountsRepository.create({
      company: 'KnGC5IFOIJo',
      email: 'knGC5IFOIJoISXEXyqX08',
      name: 'KnGC5IF',
      password: 'KnGC5IF',
    })

    await accountsSuppliersAuthorizationsRepository.create({
      account_id: account.id,
      supplier_id: 'bS5kjpssQT9pnrnrP7I4rnHv8KEqFCRW',
      authorized: true,
    })
    await accountsSuppliersAuthorizationsRepository.create({
      account_id: account.id,
      supplier_id: 'iFek0ZJ3v5Sh9bHBA3LouAh2JluzRUrj',
      authorized: true,
    })
    await accountsSuppliersAuthorizationsRepository.create({
      account_id: account.id,
      supplier_id: 'rYRTl6r5dk0C9TRr3qnaKOfD2MCYwgRb',
      authorized: true,
    })

    const accountsAuthorizations = await listSuppliersAuthorizations.execute(
      account.id
    )

    expect(accountsAuthorizations).toHaveLength(3)
  })
})
