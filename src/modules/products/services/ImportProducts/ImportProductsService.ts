import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { HandleData } from '@modules/products/jobs/BlingProductImportationJobs'
import { AppError } from '@shared/errors/AppError'
import Queue from '@shared/libs/Queue'
import { inject, injectable } from 'tsyringe'

interface ImportProductsData {
  source: 'bling'
  integration: {
    id: string
    account_id: string
  }
  update?: boolean
}

@injectable()
class ImportProductsService {
  constructor(
    @inject('IntegrationsRepository')
    private integrationsRepository: IIntegrationsRepository
  ) {}

  async execute({
    source,
    integration,
    update = false,
  }: ImportProductsData): Promise<void> {
    const existIntegration = await this.integrationsRepository.findById(
      integration.id,
      integration.account_id
    )

    if (!existIntegration) {
      throw new AppError(
        'Integration not found',
        'import_products:integration_not_found',
        400
      )
    }

    if (existIntegration.provider != source) {
      throw new AppError(
        'Integration provider mismatch',
        'import_products:integration_mismatch',
        400
      )
    }

    switch (source) {
      case 'bling':
        Queue.add<HandleData>('BlingProductImportation', {
          integration: existIntegration,
          update,
        })
        break
      default:
        throw new AppError(
          'Invalid source provided',
          'import_products:invalid_source',
          400
        )
    }
  }
}

export { ImportProductsService }
