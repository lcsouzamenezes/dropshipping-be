import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { generateTokenAndRefreshToken } from '@modules/users/utils/generateTokenAndRefreshToken'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { inject, injectable } from 'tsyringe'

interface ITokenPayload {
  sub: string
}

interface IResponse {
  token: string
  refreshToken: string
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}
  async execute(refreshToken: string): Promise<IResponse> {
    try {
      const { sub: userId } = verify(
        refreshToken,
        authConfig.refresh_token_secret
      ) as ITokenPayload

      const validRefreshToken =
        await this.userTokensRepository.findByUserIdAndToken(
          userId,
          refreshToken
        )

      if (!validRefreshToken) {
        throw new AppError(
          'Refresh Token not found',
          'refresh_token.not_found',
          400
        )
      }

      const { token: newToken, refreshToken: newRefreshToken } =
        await generateTokenAndRefreshToken(userId)

      return {
        token: newToken,
        refreshToken: newRefreshToken,
      }
    } catch (error) {
      throw new AppError('Refresh Token Expired', 'refresh_token.expired', 401)
    }
  }
}
export { RefreshTokenService }
