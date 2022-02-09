import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container, inject, injectable } from 'tsyringe'

@injectable()
class SendResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(email: string, redirectUrl?: string): Promise<void> {
    const events = container.resolve(EventProvider)

    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      events.emit('password-reset-request', { user, redirectUrl })
    }
  }
}

export { SendResetPasswordService }
