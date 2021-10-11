import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { classToClass } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'

@injectable()
class ActivateUserService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string, user_id: string): Promise<User> {
    const events = container.resolve(EventProvider)

    const validToken = await this.userTokensRepository.findByActivationToken(
      token
    )

    if (!validToken) {
      throw new AppError('Token not found', 'activation_token.not_found')
    }

    const tokenNotExpired = this.dateProvider.isFuture(validToken.expires_at)

    if (!tokenNotExpired) {
      throw new AppError('Activation Token Expired', 'activation_token.expired')
    }

    const user = await this.usersRepository.findById(validToken.user_id)

    if (!user) {
      throw new AppError('User not found', 'activation.user_not_found')
    }

    if (user.active) {
      throw new AppError('User already active', 'activation.user_active')
    }

    if (user.id != user_id) {
      throw new AppError('Invalid user ID', 'activation.invalid_user')
    }

    try {
      user.active = true
      await this.usersRepository.update(user)
      await this.userTokensRepository.deleteById(validToken.id)

      events.emit('user-activated', { user })

      const responseUser = classToClass(user)
      responseUser.active = true

      return user
    } catch (error) {
      throw new AppError('Failed to activate user', 'activation.failed')
    }
  }
}

export { ActivateUserService }
