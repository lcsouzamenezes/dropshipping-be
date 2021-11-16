import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { DeleteUserService } from './DeleteUserService'

let usersRepository: UsersRepository
let deleteUserService: DeleteUserService

describe('DeleteUserService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    deleteUserService = new DeleteUserService(usersRepository)
  })

  it('should be able to delete an user', async () => {
    const user = await usersRepository.create({
      account_id: '72828317040911107874340360252421',
      active: true,
      email: 'hatcapus@ro.su',
      name: 'Jon Morris',
      password: '60768277',
    })

    await deleteUserService.execute(user.id, '72828317040911107874340360252421')

    const users = await usersRepository.getAll(
      '72828317040911107874340360252421'
    )

    expect(users).toHaveLength(0)
  })

  it('should not be able to delete a non existing user in the correct account', async () => {
    const user = await usersRepository.create({
      account_id: '72828317040911107874340360252421',
      active: true,
      email: 'hatcapus@ro.su',
      name: 'Jon Morris',
      password: '60768277',
    })

    await deleteUserService
      .execute('NONEXISTINGID', '72828317040911107874340360252421')
      .catch((e) => expect(e.message).toBe('User not found'))
  })

  it('should not be able to delete an existing user from the incorrect account', async () => {
    const user = await usersRepository.create({
      account_id: '72828317040911107874340360252421',
      active: true,
      email: 'hatcapus@ro.su',
      name: 'Jon Morris',
      password: '60768277',
    })

    const anotherAccount = '98003281942447477916749558652266'

    await deleteUserService
      .execute(user.id, anotherAccount)
      .catch((e) => expect(e.message).toBe('User not found'))
  })
})
