import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { ICreateLisgingDTO } from '@modules/listings/dtos/ICreateListingDTO'
import { Listing } from '@modules/listings/infra/typeorm/entities/Listing'
import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateListingService {
  constructor(
    @inject('IntegrationsRepository')
    private integrationsRepository: IIntegrationsRepository,
    @inject('ListingsRepository')
    private listingsRepository: IListingsRepository
  ) {}

  async execute({
    integration_id,
    account_id,
    code,
    product_id,
    active = true,
    parent_code = null,
  }: ICreateLisgingDTO): Promise<Listing> {
    const integration = await this.integrationsRepository.findById(
      integration_id,
      account_id
    )

    if (!integration) {
      throw new AppError(
        'Integration not found',
        'get_integration.not_found',
        404
      )
    }

    const listings = await this.listingsRepository.create({
      account_id,
      code,
      integration_id,
      product_id,
      active,
      parent_code,
    })

    return listings
  }
}

export { CreateListingService }
