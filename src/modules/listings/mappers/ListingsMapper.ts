import { AccountsMapper } from '@modules/accounts/mappers/AccountsMapper'
import { IntegrationMapper } from '@modules/integrations/mappers/IntegrationMapper'
import { ProductsMapper } from '@modules/products/mappers/ProductsMapper'
import { ListingDTO } from '../dtos/ListingDTO'
import { Listing } from '../infra/typeorm/entities/Listing'

class ListingsMapper {
  static toDTO({
    product,
    account,
    integration,
    ...rest
  }: Listing): ListingDTO {
    const listing = {
      id: rest.id,
      code: rest.code,
      active: rest.active,
      created_at: rest.created_at,
      updated_at: rest.updated_at,
    } as ListingDTO

    if (product) {
      listing.product = ProductsMapper.toDTO(product)
    }

    if (account) {
      listing.account = AccountsMapper.toDTO(account)
    }

    if (integration) {
      listing.integration = {
        id: integration.id,
        provider: integration.provider,
        description: integration.description,
      }
    }

    return listing
  }
}

export { ListingsMapper }
