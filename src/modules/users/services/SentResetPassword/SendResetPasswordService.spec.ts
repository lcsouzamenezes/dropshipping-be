import { SendResetPasswordService } from './SendResetPasswordService'
import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'

let usersRepository: UsersRepository
let sendResetPasswordService: SendResetPasswordService
let events: EventProvider

describe('SendResetPasswordService', () => {
  beforeEach(() => {
    events = new EventProvider()
    usersRepository = new UsersRepository()
    sendResetPasswordService = new SendResetPasswordService(usersRepository)
  })

  it('should be able to emit an evento for send email', () => {
    //TODO: Mock event and check if has been called
  })
})
