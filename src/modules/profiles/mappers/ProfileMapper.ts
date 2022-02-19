import { Profile } from '../infra/typeorm/entities/Profile'

export interface ProfileDTO
  extends Omit<Profile, 'account_id' | 'is_main' | 'account'> {}

class ProfileMapper {
  static toDTO(profile: Profile): ProfileDTO {
    const {
      id,
      name,
      nickname,
      document_number,
      city_subscription_number,
      state_subscription_number,
      is_company,
      created_at,
      updated_at,
    } = profile
    const profileDTO: ProfileDTO = {
      id,
      name,
      nickname,
      document_number,
      city_subscription_number,
      state_subscription_number,
      is_company,
      created_at,
      updated_at,
    }

    return profileDTO
  }
}

export { ProfileMapper }
