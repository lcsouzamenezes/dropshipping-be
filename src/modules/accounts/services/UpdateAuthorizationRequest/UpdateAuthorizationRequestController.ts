import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateAuthorizationRequestService } from './UpdateAuthorizationRequestService'

class UpdateAuthorizationRequestController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { authorized } = request.body

    const updateAuthorizationRequestService = container.resolve(
      UpdateAuthorizationRequestService
    )

    const authorization = await updateAuthorizationRequestService.execute(
      id,
      authorized
    )

    return response.json(authorization)
  }
}

export { UpdateAuthorizationRequestController }
