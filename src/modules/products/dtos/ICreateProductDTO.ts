export interface ICreateProductDTO {
  name: string
  sku: string
  price: number
  stock: number
  ean?: string
  integration_product_code: string
  images?: Array<{
    url: string
    is_external?: boolean
  }>
  account_id: string
  integration_id: string
}
