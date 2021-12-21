import { CreateAddressDTO } from '@modules/addresses/dtos/CreateAddressDTO'
import { Address } from '@modules/addresses/infra/typeorm/entities/Address'
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'
import { ICreateProfileDTO } from '@modules/profiles/dtos/ICreateProfileDTO'
import { Profile } from '@modules/profiles/infra/typeorm/entities/Profile'
import { IProfilesRepository } from '@modules/profiles/repositories/IProfilesRepository'
import { inject, injectable } from 'tsyringe'

interface UpdateServiceProfileData
  extends ICreateProfileDTO,
    Omit<
      CreateAddressDTO,
      'address_2' | 'addressable_id' | 'addressable_type'
    > {
  address_2?: string
}

@injectable()
export class UpdateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository
  ) {}

  async execute({
    account_id,
    name,
    state_subscription_number,
    city_subscription_number,
    address,
    address_2,
    city,
    district,
    document_number,
    identifier,
    is_company,
    number,
    state,
    zip,
    nickname,
  }: UpdateServiceProfileData): Promise<{
    profile: Profile
    address: Address
  }> {
    const findProfile = await this.profilesRepository.getMain(account_id)
    const findAddress = await this.addressesRepository.getMain(
      account_id,
      'profiles'
    )

    let profile: Profile

    if (findProfile) {
      Object.assign(findProfile, {
        document_number,
        is_company,
        is_main: true,
        name,
        city_subscription_number:
          is_company && city_subscription_number
            ? city_subscription_number
            : null,
        state_subscription_number:
          is_company && state_subscription_number
            ? state_subscription_number
            : null,
        nickname,
      } as Profile)
      profile = await this.profilesRepository.update(findProfile)
    } else {
      profile = await this.profilesRepository.save({
        document_number,
        is_company,
        is_main: true,
        name,
        city_subscription_number:
          is_company && city_subscription_number
            ? city_subscription_number
            : null,
        state_subscription_number:
          is_company && state_subscription_number
            ? state_subscription_number
            : null,
        nickname,
        account_id,
      })
    }

    let addressEntity: Address

    if (findAddress) {
      Object.assign(findAddress, {
        addressable_type: 'profiles',
        addressable_id: profile.id,
        address,
        address_2,
        city,
        district,
        identifier: 'Profile',
        is_main: true,
        number,
        state,
        zip,
      })
      addressEntity = await this.addressesRepository.save(
        findAddress as CreateAddressDTO
      )
    } else {
      addressEntity = await this.addressesRepository.save({
        addressable_type: 'profiles',
        addressable_id: profile.id,
        address,
        address_2,
        city,
        district,
        identifier: identifier && 'Profile',
        is_main: true,
        number,
        state,
        zip,
        account_id,
      })
    }

    return {
      profile,
      address: addressEntity,
    }
  }
}
