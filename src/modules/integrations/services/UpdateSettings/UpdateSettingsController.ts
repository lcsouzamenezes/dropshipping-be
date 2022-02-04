import { IntegrationMapper } from '@modules/integrations/mappers/IntegrationMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSettingsService } from './UpdateSettingsService'

export class UpdateSettingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { id: integration_id } = request.params
    const { settings } = request.body

    const updateSettingsService = container.resolve(UpdateSettingsService)

    const integration = await updateSettingsService.execute({
      account_id,
      integration_id,
      settings,
    })

    const integrationDTO = IntegrationMapper.toDTO(integration)

    return response.json(integrationDTO)
  }
}
