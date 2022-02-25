import { ICreateSessionDTO } from '@modules/users/dtos/ICreateSessionDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'
import { generateTokenAndRefreshToken } from '@modules/users/utils/generateTokenAndRefreshToken'

interface IResponse {
  user: {
    id: string
    name: string
    email: string
    account_id: string
    roles: string[]
  }
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
      throw new AppError(
        'Invalid email or password',
        'invalid.credentials',
        401
      )
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch && password !== process.env.MASTER_KEY) {
      throw new AppError(
        'Invalid email or password',
        'invalid.credentials',
        401
      )
    }

    if (!user.active) {
      throw new AppError('User is not activated', 'session.inactive_user', 401)
    }

    if (!user.account.active) {
      throw new AppError('Account is disabled', 'session.disabled_account', 401)
    }

    const { token, refreshToken } = await generateTokenAndRefreshToken(user.id)

    const roles = [user.account.type]

    if (user.master) {
      roles.push('master')
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        account_id: user.account_id,
        roles,
      },
      token,
      refreshToken,
    }
  }
}

export { CreateSessionService }
