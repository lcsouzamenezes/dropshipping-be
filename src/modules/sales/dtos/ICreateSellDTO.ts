export interface ICreateSellDTO {
  integration_order_id: string
  listing_id: string
  account_id: string
  quantity: number
  status?: string
}
