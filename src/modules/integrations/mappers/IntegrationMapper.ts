import { IntegrationDTO } from '../dtos/IntegrationDTO'
import { Integration } from '../infra/typeorm/entities/Integration'

class IntegrationMapper {
  static toDTO({
    id,
    description,
    refresh_token,
    access_token,
    account_id,
    expires_at,
    user_id,
    provider,
  }: Integration): IntegrationDTO {
    return {
      id,
      description,
      access_token,
      account_id,
      expires_at,
      user_id,
      refresh_token,
      provider,
    }
  }
}

export { IntegrationMapper }
