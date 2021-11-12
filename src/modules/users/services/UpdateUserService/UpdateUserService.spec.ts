import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { UpdateUserService } from './UpdateUserService'

let usersRepository: UsersRepository
let updateUserService: UpdateUserService

describe('UpdateUserService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    updateUserService = new UpdateUserService(usersRepository)
  })

  it('should be able to update an user data', async () => {
    const account_id = '57884566219249078334264616819663'

    const beforeUpdateUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@company.com.br',
      account_id,
      password: '916453858977',
      active: true,
    })

    Object.assign(beforeUpdateUser, {
      name: 'Updated John Doe',
      email: 'johndoe@company.com.br',
      password: '916453858977',
      active: true,
    })

    const user = await updateUserService.execute(beforeUpdateUser)

    expect(user.name).toBe('Updated John Doe')
  })

  it('should not be able to update non existing user', async () => {
    expect.assertions(1)

    const account_id = '57884566219249078334264616819663'

    const beforeUpdateUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@company.com.br',
      account_id,
      password: '916453858977',
      active: true,
    })

    Object.assign(beforeUpdateUser, {
      name: 'Updated John Doe',
      email: 'johndoe@company.com.br',
      password: '916453858977',
      active: true,
    })

    await updateUserService
      .execute({
        ...beforeUpdateUser,
        id: '22574616146770914126247019492253',
      })
      .catch((e) => expect(e.message).toMatch('User not found!'))
  })

  it('should not be able to update an user of another account', async () => {
    expect.assertions(1)

    const account_id = '57884566219249078334264616819663'

    const beforeUpdateUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@company.com.br',
      account_id,
      password: '916453858977',
      active: true,
    })

    Object.assign(beforeUpdateUser, {
      name: 'Updated John Doe',
      email: 'johndoe@company.com.br',
      password: '916453858977',
      active: true,
    })

    await updateUserService
      .execute({
        ...beforeUpdateUser,
        account_id: '29427686092213199497627985692952',
      })
      .catch((e) => expect(e.message).toMatch('User not found!'))
  })
})
