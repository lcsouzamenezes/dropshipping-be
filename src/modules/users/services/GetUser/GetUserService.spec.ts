import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { AppError } from '@shared/errors/AppError'
import { GetUserService } from './GetUserService'

let usersRepository: UsersRepository
let getUserService: GetUserService

describe('GetUserService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    getUserService = new GetUserService(usersRepository)
  })

  it('should be able to list an user', async () => {
    const account_id = '57884566219249078334264616819663'

    const { id: user_id } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@company.com.br',
      account_id,
      password: '916453858977',
      active: true,
    })

    const user = await getUserService.execute({
      user_id,
      account_id,
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to list a non existing user', async () => {
    expect.assertions(1)

    const account_id = '57884566219249078334264616819663'

    const { id: user_id } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@company.com.br',
      account_id,
      password: '916453858977',
      active: true,
    })

    await getUserService
      .execute({
        user_id: '63699380664769420546449639934828',
        account_id,
      })
      .catch((e) => expect(e.message).toMatch('User not found'))
  })

  it('should not be able to list a user that dont belong to account', async () => {
    expect.assertions(1)

    const account_id = '57884566219249078334264616819663'

    const { id: user_id } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@company.com.br',
      account_id,
      password: '916453858977',
      active: true,
    })

    await getUserService
      .execute({
        user_id,
        account_id: '90291218954330536534253192670950',
      })
      .catch((e) => expect(e.message).toMatch('User not found'))
  })
})
