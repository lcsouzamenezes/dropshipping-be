import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { CreateSessionService } from './CreateSessionService'
import bcryptjs from 'bcryptjs'
import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { UserTokensRepository } from '@modules/users/repositories/in-memory/UserTokensRepository'
import { FakeDateProvider } from '@shared/providers/DateProvider/fakes/FakeDateProvider'
import { AppError } from '@shared/errors/AppError'

let accountsRepository: AccountsRepository
let usersRepository: UsersRepository
let userTokensRepository: UserTokensRepository
let createSessionService: CreateSessionService
let dateProvider: FakeDateProvider

describe('CreateSessionService', () => {
  jest.spyOn(bcryptjs, 'compare').mockImplementation((s, h) => s === h)

  beforeAll(async () => {
    accountsRepository = new AccountsRepository()
    userTokensRepository = new UserTokensRepository()
    usersRepository = new UsersRepository(accountsRepository)
    dateProvider = new FakeDateProvider()
    createSessionService = new CreateSessionService(
      usersRepository,
      userTokensRepository,
      dateProvider
    )
  })

  it('shoul be able to create a session', async () => {
    const accountData = {
      name: 'Virginia Moran',
      email: 'wusofeceg@ku.pl',
      password: 'CyhiN956tSc5',
    }

    const account = await accountsRepository.create(accountData)

    await usersRepository.create({
      ...accountData,
      account_id: account.id,
    })

    const session = await createSessionService.execute({
      email: 'wusofeceg@ku.pl',
      password: 'CyhiN956tSc5',
    })

    expect(session).toHaveProperty('token')
    expect(session).toHaveProperty('refreshToken')
  })

  it('should not be able to create a session with invalid email', async () => {
    const accountData = {
      name: 'Virginia Moran',
      email: 'wusofeceg@ku.pl',
      password: 'CyhiN956tSc5',
    }

    const account = await accountsRepository.create(accountData)

    await usersRepository.create({
      ...accountData,
      account_id: account.id,
    })

    const session = async () => {
      await createSessionService.execute({
        email: 'tewmifan@ajet.bt',
        password: '8X4t0drrPmfY',
      })
    }

    expect(session).rejects.toThrowError('Invalid email or password')
  })

  it('should not be able to create a session with invalid password', async () => {
    const accountData = {
      name: 'Virginia Moran',
      email: 'wusofeceg@ku.pl',
      password: 'CyhiN956tSc5',
    }

    const account = await accountsRepository.create(accountData)

    await usersRepository.create({
      ...accountData,
      account_id: account.id,
    })

    const session = async () => {
      await createSessionService.execute({
        email: 'wusofeceg@ku.pl',
        password: '8X4t0drrPmfY',
      })
    }

    expect(session).rejects.toThrowError('Invalid email or password')
  })
})
