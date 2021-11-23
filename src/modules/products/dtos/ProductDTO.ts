import { AccountDTO } from '@modules/accounts/dtos/AccountDTO'

interface productDTO {
  id: string
  name: string
  sku: string
  ean: string
  price: number
  stock: number
  integration_id?: string
  images?: Array<{
    id: string
    url: string
    is_external: boolean
    created_at?: Date
    updated_at?: Date
  }>
  account?: AccountDTO
  created_at?: Date
  updated_at?: Date
}

export { productDTO }
