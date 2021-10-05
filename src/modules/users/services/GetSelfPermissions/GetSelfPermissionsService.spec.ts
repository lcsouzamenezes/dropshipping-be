import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { GetSelfPermissionsService } from './GetSelfPermissionsService'

describe('GetSelfPermissionsService', () => {
  let accountsRepository: AccountsRepository
  let usersRepository: UsersRepository
  let getSelfPermissions: GetSelfPermissionsService

  beforeAll(() => {
    accountsRepository = new AccountsRepository()
    usersRepository = new UsersRepository(accountsRepository)
    getSelfPermissions = new GetSelfPermissionsService(usersRepository)
  })

  it('should be able to list all permissions of the user', async () => {
    const userData = {
      email: 'odada@igogeh.au',
      password: '21850298835774138354129182024017',
    }

    const account = await accountsRepository.create({
      ...userData,
      name: 'Madge Warren',
      active: true,
      type: 'supplier',
    })
    const user = await usersRepository.create({
      ...userData,
      account_id: account.id,
    })

    const permissions = await getSelfPermissions.execute(user.id)

    expect(permissions).toHaveLength(1)
    expect(permissions[0]).toBe('supplier')
  })
})
