import { UserTokensRepository } from '@modules/users/repositories/in-memory/UserTokensRepository'
import { RefreshTokenService } from './RefreshTokenService'
import JWT, { JwtPayload } from 'jsonwebtoken'
import * as GenerateTokenAndRefreshToken from '@modules/users/utils/generateTokenAndRefreshToken'

let userTokensRepository: UserTokensRepository
let refreshTokenService: RefreshTokenService

describe('RefreshTokenService', () => {
  beforeAll(() => {
    userTokensRepository = new UserTokensRepository()
    refreshTokenService = new RefreshTokenService(userTokensRepository)
  })

  it('should be able to generate a new token and refresh_token', async () => {
    const refreshToken = '60254609253960249445157658414871'

    jest.spyOn(JWT, 'verify').mockImplementation(
      (): JwtPayload => ({
        sub: '123',
      })
    )

    jest
      .spyOn(GenerateTokenAndRefreshToken, 'generateTokenAndRefreshToken')
      .mockImplementation(async () => {
        return {
          token: '12345',
          refreshToken: '12345',
        }
      })

    await userTokensRepository.create({
      token: refreshToken,
      expires_at: new Date(),
      user_id: '123',
      type: 'refresh_token',
    })

    const response = await refreshTokenService.execute(refreshToken)

    expect(response).toHaveProperty('token')
    expect(response).toHaveProperty('refreshToken')
  })
})
