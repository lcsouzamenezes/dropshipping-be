export interface ICreateProfileDTO {
  name: string

  nickname?: string

  is_company: boolean

  document_number: number

  state_subscription_number?: number | null

  city_subscription_number?: number | null

  is_main?: boolean

  account_id: string
}
