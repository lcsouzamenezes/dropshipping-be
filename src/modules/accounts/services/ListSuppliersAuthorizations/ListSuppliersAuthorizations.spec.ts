import { AccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/in-memory/AccountsSuppliersAuthorizations'
import { ListSuppliersAuthorizationsService } from './ListSuppliersAuthorizationsService'

let accountsSuppliersAuthorizationsRepository: AccountsSuppliersAuthorizationsRepository
let listSuppliersAuthorizations: ListSuppliersAuthorizationsService

describe('ListSuppliersAuthorizationsService', () => {
  beforeEach(() => {
    accountsSuppliersAuthorizationsRepository =
      new AccountsSuppliersAuthorizationsRepository()
    listSuppliersAuthorizations = new ListSuppliersAuthorizationsService(
      accountsSuppliersAuthorizationsRepository
    )
  })

  it('should be able to list all authorizations from account', async () => {
    const account_id = 'KnGC5IFOIJoISXEXyqX08LylwUC6L4JK'

    await accountsSuppliersAuthorizationsRepository.create({
      account_id,
      supplier_id: 'bS5kjpssQT9pnrnrP7I4rnHv8KEqFCRW',
      authorized: true,
    })
    await accountsSuppliersAuthorizationsRepository.create({
      account_id,
      supplier_id: 'iFek0ZJ3v5Sh9bHBA3LouAh2JluzRUrj',
      authorized: true,
    })
    await accountsSuppliersAuthorizationsRepository.create({
      account_id,
      supplier_id: 'rYRTl6r5dk0C9TRr3qnaKOfD2MCYwgRb',
      authorized: true,
    })

    const accountsAuthorizations = await listSuppliersAuthorizations.execute(
      account_id
    )

    expect(accountsAuthorizations).toHaveLength(3)
  })
})
