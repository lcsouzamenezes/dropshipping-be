import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface ISetting {
  store_id: string
}

@injectable()
export class UpdateSettingsService {
  constructor(
    @inject('IntegrationsRepository')
    private integrationsRepository: IIntegrationsRepository
  ) {}

  async execute({
    account_id,
    integration_id,
    settings,
  }: {
    account_id: string
    integration_id: string
    settings: ISetting
  }): Promise<Integration> {
    const integration = await this.integrationsRepository.findById(
      integration_id,
      account_id
    )

    if (!integration) {
      throw new AppError(
        'Integration not found',
        'update_settings:not_found',
        404
      )
    }

    integration.settings = JSON.stringify(settings)

    const updatedIntegration = await this.integrationsRepository.update(
      integration
    )

    return updatedIntegration
  }
}
