import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { ICreateComboLisgingDTO } from '@modules/listings/dtos/ICreateComboListingDTO'
import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateComboListingService {
  constructor(
    @inject('IntegrationsRepository')
    private integrationsRepository: IIntegrationsRepository,
    @inject('ListingsRepository')
    private listingsRepository: IListingsRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    account_id,
    code,
    integration_id,
    products_id,
    active = true,
    parent_code = null,
  }: ICreateComboLisgingDTO) {
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

    const codeExist = await this.listingsRepository.findByCode(code)

    if (codeExist) {
      throw new AppError(
        'Listing already exists',
        'create_listing:code_exists',
        409
      )
    }

    const listings = await this.listingsRepository.create({
      account_id,
      code,
      integration_id,
      products_id,
      active,
      parent_code,
    })

    return listings
  }
}

export { CreateComboListingService }
