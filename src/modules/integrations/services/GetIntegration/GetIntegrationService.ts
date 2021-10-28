import { IntegrationDTO } from '@modules/integrations/dtos/IntegrationDTO'
import { IntegrationMapper } from '@modules/integrations/mappers/IntegrationMapper'
import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetIntegrationService {
  constructor(
    @inject('IntegrationsRepository')
    private integrationsRepository: IIntegrationsRepository
  ) {}

  async execute(id: string, account_id: string): Promise<IntegrationDTO> {
    const integration = await this.integrationsRepository.findById(
      id,
      account_id
    )

    if (!integration) {
      throw new AppError('Integration not found!', 'integration:not_found', 404)
    }

    return IntegrationMapper.toDTO(integration)
  }
}

export { GetIntegrationService }
