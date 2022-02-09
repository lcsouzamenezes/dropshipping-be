import { IRecoveryPasswordDTO } from '@modules/users/dtos/IRecoveryPasswordDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateRecoveryPasswordService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({
    user_id,
    token,
    password,
  }: IRecoveryPasswordDTO): Promise<void> {
    const validToken = await this.userTokensRepository.findByActivationToken(
      token
    )

    if (!validToken) {
      throw new AppError('Token not found', 'recovery_password_token.not_found')
    }

    const tokenNotExpired = this.dateProvider.isFuture(validToken.expires_at)

    if (!tokenNotExpired) {
      throw new AppError('Token Expired', 'recovery_password_token.expired')
    }

    const user = await this.usersRepository.findById(validToken.user_id)

    if (!user || user.id !== user_id) {
      throw new AppError('User not found', 'recovery.user_not_found')
    }

    const hashedPassword = await hash(password, 8)
    user.password = hashedPassword

    try {
      await this.usersRepository.update(user)
    } catch (error) {
      throw new AppError('Failed to update user', 'recovery.update_failed')
    }
  }
}

export { UpdateRecoveryPasswordService }
