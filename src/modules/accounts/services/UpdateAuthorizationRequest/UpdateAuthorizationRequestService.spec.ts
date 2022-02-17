import { AccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/in-memory/AccountsSuppliersAuthorizations'
import { UpdateAuthorizationRequestService } from './UpdateAuthorizationRequestService'

let accountsSuppliersAuthorizationsRepository: AccountsSuppliersAuthorizationsRepository
let updateAuthorizationRequestService: UpdateAuthorizationRequestService

describe('UpdateAuthorizationRequestService', () => {
  beforeEach(() => {
    accountsSuppliersAuthorizationsRepository =
      new AccountsSuppliersAuthorizationsRepository()
    updateAuthorizationRequestService = new UpdateAuthorizationRequestService(
      accountsSuppliersAuthorizationsRepository
    )
  })

  it('should be able to update an authorization', async () => {
    const authorization =
      await accountsSuppliersAuthorizationsRepository.create({
        account_id: 'zetl0SE5Fk6L28XUcGqIwYm1wG4pJOvM',
        authorized: false,
        supplier_id: 'YAW6dHpRs8JB7vvJnZ3rKq27d1aI9WKE',
      })

    const updatedAuthorization =
      await updateAuthorizationRequestService.execute(authorization.id, true)

    expect(updatedAuthorization.authorized).toBeTruthy()
  })
})
