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

    const user = new User()

    Object.assign(user, {
      email: 'awipwe@tu.nu',
      password: '78GbS8r5CN3X',
      active: false,
      master: false,
    })

    await sendActivationMailService.execute(user)

    expect(spyOnMailProviderSend).toBeCalledTimes(1)
  })
})
