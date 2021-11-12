import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { UserTokensRepository } from '@modules/users/repositories/in-memory/UserTokensRepository'
import { Moment } from '@shared/providers/DateProvider/implementations/Moment'
import { ActivateUserService } from './ActivateUserService'

let accountsRepository: AccountsRepository
let usersRepository: UsersRepository
let userTokensRepository: UserTokensRepository
let dateProvider: Moment
let activateAccountService: ActivateUserService

describe('ActivateUserService', () => {
  beforeAll(() => {
    accountsRepository = new AccountsRepository()
    userTokensRepository = new UserTokensRepository()
    usersRepository = new UsersRepository()
    dateProvider = new Moment()
    activateAccountService = new ActivateUserService(
      userTokensRepository,
      usersRepository,
      dateProvider
    )
  })

  it('should be able to activate an account', async () => {
    const activationToken = '23364702659627525716079711491264'

    const userData = {
      name: 'Elnora Rivera',
      email: 'vanhuk@hocisfe.je',
      password: '747950239785',
    }

    const account = await accountsRepository.create({
      company: 'Peter Cunningham',
      active: false,
      ...userData,
    })

    const user = await usersRepository.create({
      account_id: account.id,
      active: false,
      ...userData,
    })

    await userTokensRepository.create({
      token: activationToken,
      user_id: user.id,
      expires_at: dateProvider.addMinutes(10),
      type: 'activation_token',
    })

    const activatedUser = await activateAccountService.execute(
      activationToken,
      user.id
    )

    expect(activatedUser.active).toBeTruthy()
  })
})
