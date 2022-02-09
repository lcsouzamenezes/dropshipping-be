import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { UserTokensRepository } from '@modules/users/repositories/in-memory/UserTokensRepository'
import { FakeDateProvider } from '@shared/providers/DateProvider/fakes/FakeDateProvider'
import { compare } from 'bcryptjs'
import { UpdateRecoveryPasswordService } from './UpdateRecoveryPasswordService'

let userTokensRepository: UserTokensRepository
let usersRepository: UsersRepository
let dateProvider: FakeDateProvider
let updateRecoveryPasswordService: UpdateRecoveryPasswordService

describe('UpdateRecoveryPasswordService', () => {
  beforeEach(() => {
    userTokensRepository = new UserTokensRepository()
    usersRepository = new UsersRepository()
    dateProvider = new FakeDateProvider()
    updateRecoveryPasswordService = new UpdateRecoveryPasswordService(
      userTokensRepository,
      usersRepository,
      dateProvider
    )
  })

  it('should be able to reset an password', async () => {
    const activationToken = '23364702659627525716079711491264'
    const account_id = 'SplNzvhAzIagjnHRydlAWIHtRcFHDJdW'

    const userData = {
      name: 'Elnora Rivera',
      email: 'vanhuk@hocisfe.je',
      password: '747950239785',
    }

    const user = await usersRepository.create({
      account_id: account_id,
      active: false,
      ...userData,
    })

    await userTokensRepository.create({
      token: activationToken,
      user_id: user.id,
      expires_at: dateProvider.addMinutes(10),
      type: 'activation_token',
    })

    await updateRecoveryPasswordService.execute({
      user_id: user.id,
      password: '12345678',
      token: activationToken,
    })

    const updatedUser = await usersRepository.findById(user.id)

    expect(compare('12345678', updatedUser.password)).toBeTruthy()
  })
})
