import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import { container } from 'tsyringe'
import { IUserTokensRepository } from '../repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'

async function generateTokenAndRefreshToken(user_id: string) {
  const userTokensRepository = container.resolve<IUserTokensRepository>(
    'UserTokensRepository'
  )
  const dateProvider = container.resolve<IDateProvider>('DateProvider')

  const token = sign({}, authConfig.token_secret, {
    subject: user_id,
    expiresIn: authConfig.token_expires_in,
  })

  const refreshToken = sign({}, authConfig.refresh_token_secret, {
    subject: user_id,
    expiresIn: authConfig.refresh_token_expires_in,
  })

  const refreshTokenExpiresAt = dateProvider.addSeconds(
    authConfig.refresh_token_expires_in
  )

  await userTokensRepository.deleteUserRefreshTokens(user_id)

  await userTokensRepository.create({
    token: refreshToken,
    expires_at: refreshTokenExpiresAt,
    type: 'refresh_token',
    user_id: user_id,
  })

  return { token, refreshToken }
}

export { generateTokenAndRefreshToken }
