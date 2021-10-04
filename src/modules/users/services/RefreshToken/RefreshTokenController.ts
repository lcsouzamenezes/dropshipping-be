import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RefreshTokenService } from './RefreshTokenService'

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body

    const refreshTokenService = container.resolve(RefreshTokenService)

    const { token, refreshToken } = await refreshTokenService.execute(
      refresh_token
    )

    return response.json({
      token,
      refresh_token: refreshToken,
    })
  }
}

export { RefreshTokenController }
