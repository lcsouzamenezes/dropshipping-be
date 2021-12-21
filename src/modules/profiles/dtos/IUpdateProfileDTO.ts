export interface IUpdateProfileDTO {
  id: string
  name: string
  nickname?: string
  is_company: boolean
  document: number
  state_subscription_number: number
  city_subscription_number?: number
  zip: number
  state: string
  city: string
  district: string
  address: string
  address_2?: string
  number: string
}
