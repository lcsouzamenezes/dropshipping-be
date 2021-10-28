interface IntegrationDTO {
  id: string
  description: string
  account_id: string
  access_token: string
  refresh_token: string | null
  user_id: string | null
  expires_at: Date
  provider: string
}

export { IntegrationDTO }
