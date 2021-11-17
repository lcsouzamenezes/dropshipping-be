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
        name: 'Cody Owen',
        email: 'test@example.com' + i,
        account_id: '12345',
        password: '12345',
        active: true,
      })
    }

    const users = await listUsersService.execute('12345')

    expect(users).toHaveLength(3)
  })
})
