import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetIntegrationService } from './GetIntegrationService'

class GetIntegrationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { token } = request.headers
    const account_id = token as string

    const getIntegrationService = container.resolve(GetIntegrationService)

    const integration = await getIntegrationService.execute(id, account_id)

    return response.json(integration)
  }
}

export { GetIntegrationController }
