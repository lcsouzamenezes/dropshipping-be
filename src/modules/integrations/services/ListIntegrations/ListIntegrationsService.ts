import { IntegrationDTO } from '@modules/integrations/dtos/IntegrationDTO'
import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { IntegrationMapper } from '@modules/integrations/mappers/IntegrationMapper'
import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListIntegrationsService {
  constructor(
    @inject('IntegrationsRepository')
    private integrationsRepository: IIntegrationsRepository
  ) {}

  async execute(
    account_id: string,
    provider?: string
  ): Promise<IntegrationDTO[]> {
    const integrations = await this.integrationsRepository.findByAccountId(
      account_id,
      provider
    )

    return integrations.map((integration) =>
      IntegrationMapper.toDTO(integration)
    )
  }
}

export { ListIntegrationsService }
