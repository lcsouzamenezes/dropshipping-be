import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { AppError } from '@shared/errors/AppError'
import { Bling } from '@shared/libs/Bling'
import { Readable, Writable } from 'stream'
import { inject, injectable } from 'tsyringe'
import {
  EntityManager,
  Repository,
  Transaction,
  TransactionManager,
  TransactionRepository,
} from 'typeorm'

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
    private integrationsRepository: IIntegrationsRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
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
        //add job registration
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
