import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { UsersRepository as UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepository'
import { CreateUserService } from './CreateUserService'

let accountsRepository: AccountsRepository
let usersRepository: UserRepositoryInMemory

describe('CreateUserService', () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository()
    usersRepository = new UserRepositoryInMemory()
  })

  it('should be able to create a new user', async () => {
    const createUserService = new CreateUserService(usersRepository)

    const userData = {
      email: 'mizani@nog.sx',
      password: 'SSNLKg5aOm',
      name: 'Cody Owen',
    }

    const account = await accountsRepository.create({
      company: 'Cody Owen Comp.',
      ...userData,
    })

    const user = await createUserService.execute({
      ...userData,
      account_id: account.id,
    })
    expect(user).toHaveProperty('id')
  })

  it('should encrypt the password', async () => {
    const createUserService = new CreateUserService(usersRepository)

    const notHashedPassword = 'wbXbdlonb1lE'

    const userData = {
      name: 'Cody Owen',
      email: 'ejeuctan@egzunadu.ht',
      password: notHashedPassword,
    }

    const account = await accountsRepository.create({
      company: 'Cody Owen Comp.',
      ...userData,
    })

    const user = await createUserService.execute({
      ...userData,
      account_id: account.id,
    })
    expect(user.password).not.toEqual(notHashedPassword)
  })

  it('should creaate a user with inactive status', async () => {
    const createUserService = new CreateUserService(usersRepository)

    const userData = {
      email: 'ba@ma.vi',
      password: 'KUMXW5hy8yNN',
      name: 'Cody Owen',
    }

    const account = await accountsRepository.create({
      company: 'Brent Hart Comp.',
      ...userData,
    })

    const user = await createUserService.execute({
      ...userData,
      account_id: account.id,
    })
    expect(user.active).toBeFalsy()
  })

  it('should not be able to create a user with existing email', async () => {
    const createUserService = new CreateUserService(usersRepository)

    const userData = {
      email: 'ba@ma.vi',
      password: 'KUMXW5hy8yNN',
      name: 'Cody Owen',
    }

    const account = await accountsRepository.create({
      company: 'Brent Hart Comp.',
      ...userData,
    })

    const user = await createUserService.execute({
      ...userData,
      account_id: account.id,
    })

    const tryAgain = async () => {
      await createUserService.execute({
        ...userData,
        account_id: account.id,
      })
    }

    expect(tryAgain).rejects.toThrow('E-mail already taken')
  })
})
