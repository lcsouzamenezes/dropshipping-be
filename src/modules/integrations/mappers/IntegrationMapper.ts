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
    settings,
  }: Integration): IntegrationDTO {
    return {
      id,
      description,
      access_token,
      account_id,
      expires_at,
      user_id: user_id ? user_id : null,
      refresh_token: refresh_token ? refresh_token : null,
      provider,
      settings: settings ? JSON.parse(settings) : null,
    }
  }
}

export { IntegrationMapper }
