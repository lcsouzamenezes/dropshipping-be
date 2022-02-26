import { Address } from '@modules/addresses/infra/typeorm/entities/Address'
import { AddressMapper } from '@modules/addresses/mappers/AddressMapper'
import { Profile } from '../infra/typeorm/entities/Profile'

export interface ProfileDTO
  extends Omit<Profile, 'account_id' | 'is_main' | 'account' | 'address'> {
  address?: Address
}

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
      address,
      mobile_number,
      image,
    } = profile
    const profileDTO: ProfileDTO = {
      id,
      name,
      nickname,
      document_number,
      city_subscription_number,
      state_subscription_number,
      is_company,
      mobile_number,
      image,
      created_at,
      updated_at,
    }

    if (address) {
      Object.assign(profileDTO, { address: AddressMapper.toDTO(address) })
    }

    return profileDTO
  }
}

export { ProfileMapper }
