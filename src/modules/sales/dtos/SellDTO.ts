import { AccountDTO } from '@modules/accounts/dtos/AccountDTO'
import { ListingDTO } from '@modules/listings/dtos/ListingDTO'

export interface SellDTO {
  id: string
  integration_order_id: string
  quantity: number
  created_at: Date
  updated_at: Date
  account: AccountDTO
  listing: ListingDTO
}
