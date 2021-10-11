import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { UserTokensRepository } from '@modules/users/repositories/in-memory/UserTokensRepository'
import { FakeDateProvider } from '@shared/providers/DateProvider/fakes/FakeDateProvider'
import { FakeMailProvider } from '@shared/providers/MailProvider/fakes/FakeMailProvider'
import { FakeViewProvider } from '@shared/providers/ViewProvider/fakes/FakeViewProvider'
import { SendActivationMailService } from './SendActivationMailService'

let sendActivationMailService: SendActivationMailService
let viewProvider: FakeViewProvider
let mailProvider: FakeMailProvider
let userTokensRepository: UserTokensRepository
let dateProvider: FakeDateProvider

describe('SendActivationMailService', () => {
  beforeAll(() => {
    viewProvider = new FakeViewProvider()
    mailProvider = new FakeMailProvider(viewProvider)
    userTokensRepository = new UserTokensRepository()
    dateProvider = new FakeDateProvider()
    sendActivationMailService = new SendActivationMailService(
      mailProvider,
      userTokensRepository,
      dateProvider
    )
  })

  it('should be able to send a email', async () => {
    const spyOnMailProviderSend = jest.spyOn(mailProvider, 'send')

    const account = new Account()
    const user = new User()

    Object.assign(user, {
      name: 'Cody Owen',
      account_id: account.id,
      email: 'awipwe@tu.nu',
      password: '78GbS8r5CN3X',
      active: false,
      master: false,
    })

    account.user = user

    await sendActivationMailService.execute(account)

    expect(spyOnMailProviderSend).toBeCalledTimes(1)
  })
})
