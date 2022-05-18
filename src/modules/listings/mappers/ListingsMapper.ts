import { AccountsMapper } from '@modules/accounts/mappers/AccountsMapper'
import { ProductsMapper } from '@modules/products/mappers/ProductsMapper'
import { ListingDTO } from '../dtos/ListingDTO'
import { Listing } from '../infra/typeorm/entities/Listing'

class ListingsMapper {
  static toDTO({
    products,
    account,
    integration,
    ...rest
  }: Listing): ListingDTO {
    const listing = {
      id: rest.id,
      code: rest.code,
      active: rest.active,
      parent_code: rest.parent_code ?? null,
      created_at: rest.created_at,
      updated_at: rest.updated_at,
    } as ListingDTO

    if (products) {
      listing.products = products.map((product) =>
        ProductsMapper.toDTO(product)
      )
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
