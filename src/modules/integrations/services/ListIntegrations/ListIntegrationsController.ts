import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListIntegrationsService } from './ListIntegrationsService'

class ListIntegrationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const type = request.query.type as string

    const listIntegrationsService = container.resolve(ListIntegrationsService)
    const integrations = await listIntegrationsService.execute(account_id, type)

    return response.send(integrations)
  }
}

export { ListIntegrationsController }
