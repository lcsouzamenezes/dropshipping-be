import { ICreateSessionDTO } from '@modules/users/dtos/ICreateSessionDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import authConfig from '@config/auth'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'
import { generateTokenAndRefreshToken } from '@modules/users/utils/generateTokenAndRefreshToken'

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
      throw new AppError('Invalid email or password', 'invalid.credentials')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Invalid email or password', 'invalid.credentials')
    }

    const { token, refreshToken } = await generateTokenAndRefreshToken(user.id)

    const roles = [user.account.type]

    if (user.master) {
      roles.push('master')
    }

    return {
      user: {
        email,
        roles,
      },
      token,
      refreshToken,
    }
  }
}

export { CreateSessionService }
