import { AccountDTO } from '@modules/accounts/dtos/AccountDTO'
import { productDTO } from '@modules/products/dtos/ProductDTO'

interface ListingDTO {
  id: string
  code: string
  active: boolean
  parent_code: string | null

  integration: {
    id: string
    description: string
    provider: string
  }
  account: AccountDTO
  products: productDTO[]

  created_at: Date
  updated_at: Date
}

export { ListingDTO }
