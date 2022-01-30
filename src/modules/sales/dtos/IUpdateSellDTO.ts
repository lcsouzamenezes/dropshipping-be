import { ISaleStatus } from '../infra/typeorm/entities/Sell'

export interface IUpdateSellDTO {
  id: string
  integration_order_id: string
  listing_id: string
  account_id: string
  quantity: number
  invoice?: string
  label?: string
  receipt?: string
  status?: ISaleStatus
}
