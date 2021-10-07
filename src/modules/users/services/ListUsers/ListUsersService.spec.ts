import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { ListUsersService } from './ListUsersService'

let usersRepository: UsersRepository
let listUsersService: ListUsersService

describe('ListUsersService', () => {
  beforeAll(() => {
    usersRepository = new UsersRepository()
    listUsersService = new ListUsersService(usersRepository)
  })

  it('should be able to list users', async () => {
    for (let i = 0; i < 3; i++) {
      await usersRepository.create({
        email: 'test@example.com' + i,
        account_id: '12345-' + i,
        password: '12345',
      })
    }

    const users = await listUsersService.execute()

    expect(users).toHaveLength(3)
  })
})
