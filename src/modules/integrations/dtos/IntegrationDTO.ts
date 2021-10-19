interface IntegrationDTO {
  id: string
  description: string
  account_id: string
  access_token: string
  refresh_token: string
  user_id: string
  expires_at: Date
  provider: string
}

export { IntegrationDTO }
