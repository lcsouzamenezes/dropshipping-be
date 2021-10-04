import { RefreshTokenService } from './RefreshTokenService'

let refreshTokenService: RefreshTokenService

describe('RefreshTokenService', () => {
  beforeAll(() => {
    refreshTokenService = new RefreshTokenService()
  })

  it('should be able to generate a new token and refresh_token', async () => {
    const refreshToken = '60254609253960249445157658414871'

    const response = await refreshTokenService.execute(refreshToken)

    expect(response).toHaveProperty(['token', 'refresh_token'])
  })
})
