import { ICreateSessionDTO } from '@modules/users/dtos/ICreateSessionDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import authConfig from '@config/auth'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'

interface IResponse {
  user: {}
  token: string
  refreshToken: string
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: ICreateSessionDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid email or password')!
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Invalid email or password')!
    }

    const token = sign({}, authConfig.token_secret, {
      subject: user.id,
      expiresIn: authConfig.token_expires_in,
    })

    const refreshToken = sign({}, authConfig.refresh_token_secret, {
      subject: user.id,
      expiresIn: authConfig.refresh_token_expires_in,
    })

    const refreshTokenExpiresAt = this.dateProvider.addSeconds(
      authConfig.refresh_token_expires_in
    )

    await this.userTokensRepository.deleteUserRefreshTokens(user.id)

    await this.userTokensRepository.create({
      token: refreshToken,
      expires_at: refreshTokenExpiresAt,
      type: 'refresh_token',
      user_id: user.id,
    })

    return {
      user: {
        email,
        role: user.account.type,
      },
      token,
      refreshToken,
    }
  }
}

export { CreateSessionService }
