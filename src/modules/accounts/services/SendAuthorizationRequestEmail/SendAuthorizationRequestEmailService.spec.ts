import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { FakeMailProvider } from '@shared/providers/MailProvider/fakes/FakeMailProvider'
import { FakeViewProvider } from '@shared/providers/ViewProvider/fakes/FakeViewProvider'
import { SendAuthorizationRequestEmailService } from './SendAuthorizationRequestEmailService'

let usersRepository: UsersRepository
let sendAuthorizationRequestEmailService: SendAuthorizationRequestEmailService
let viewProvider: FakeViewProvider
let mailProvider: FakeMailProvider

describe('SendAuthorizationRequestEmailService', () => {
  beforeAll(() => {
    usersRepository = new UsersRepository()
    viewProvider = new FakeViewProvider()
    mailProvider = new FakeMailProvider(viewProvider)
    sendAuthorizationRequestEmailService =
      new SendAuthorizationRequestEmailService(mailProvider, usersRepository)
  })

  it('should be able to send a email', async () => {
    const spyOnMailProviderSend = jest.spyOn(mailProvider, 'send')

    const account = new Account()
    await usersRepository.create({
      name: 'Cody Owen',
      account_id: account.id,
      email: 'awipwe@tu.nu',
      password: '78GbS8r5CN3X',
      active: false,
    })

    await sendAuthorizationRequestEmailService.execute({ supplier: account })

    expect(spyOnMailProviderSend).toBeCalledTimes(1)
  })
})
