import { IntegrationMapper } from '@modules/integrations/mappers/IntegrationMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import {
  CreateIntegrationService,
  ICreateIntegration,
} from './CreateIntegrationService'

interface IRequest {
  description: string
  access_token: string
  refresh_token?: string
  expires_at?: number
  user_id: string
}

type IParams = Pick<ICreateIntegration, 'provider'>

class CreateIntegrationServiceController {
  async handle(
    request: Request<IParams>,
    response: Response
  ): Promise<Response> {
    const createIntegrationService = container.resolve(CreateIntegrationService)

    const { provider } = request.params

    const { description, access_token, expires_at, user_id, refresh_token } =
      request.body as IRequest

    const { account_id } = request.user

    const mercadoLivreAccount = await createIntegrationService.execute({
      description,
      access_token,
      expires_at,
      account_id,
      refresh_token,
      user_id,
      provider,
    })
    return response.json(IntegrationMapper.toDTO(mercadoLivreAccount))
  }
}

export { CreateIntegrationServiceController }
