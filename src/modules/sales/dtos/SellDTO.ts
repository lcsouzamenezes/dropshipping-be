import { AccountDTO } from '@modules/accounts/dtos/AccountDTO'
import { ListingDTO } from '@modules/listings/dtos/ListingDTO'
import { ISaleStatus } from '../infra/typeorm/entities/Sell'

export interface SellDTO {
  id: string
  integration_order_id: string
  quantity: number
  created_at: Date
  updated_at: Date
  account: AccountDTO
  listing: ListingDTO
  status: ISaleStatus
  invoice?: string
  label?: string
  receipt?: string
}
