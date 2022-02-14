import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RequestAutorizationService } from './RequestAutorizationService'

class RequestAutorizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { id: supplier_id } = request.params

    const requestAutorizationService = container.resolve(
      RequestAutorizationService
    )

    const authorization = await requestAutorizationService.execute(
      account_id,
      supplier_id
    )

    return response.json(authorization)
  }
}

export { RequestAutorizationController }
