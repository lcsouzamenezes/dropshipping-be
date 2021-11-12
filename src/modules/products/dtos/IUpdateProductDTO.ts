export interface IUpdateProductDTO {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  ean?: string
  images?: Array<{
    url: string
    is_external?: boolean
  }>
  account_id: string
  integration_id: string
}
