import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'
import { inject, injectable } from 'tsyringe'

export interface ICreateIntegration {
  description: string
  account_id: string
  access_token: string
  refresh_token?: string
  expires_at?: number
  user_id?: string
  provider: 'mercadolivre' | 'bling'
}

@injectable()
class CreateIntegrationService {
  constructor(
    @inject('IntegrationsRepository')
    private integrationsRepository: IIntegrationsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    description,
    account_id,
    access_token,
    expires_at,
    user_id,
    refresh_token,
    provider,
  }: ICreateIntegration): Promise<Integration> {
    const integrationExists = await this.integrationsRepository.findByUserId(
      user_id,
      account_id
    )

    if (integrationExists) {
      await this.integrationsRepository.deleteById(integrationExists.id)
    }

    const integration = await this.integrationsRepository.create(
      {
        description,
        access_token,
        expires_at: this.dateProvider.addSeconds(expires_at),
        user_id,
        refresh_token,
        provider,
      },
      account_id
    )

    return integration
  }
}

export { CreateIntegrationService }
