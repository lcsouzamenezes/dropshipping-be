import { Address } from '../infra/typeorm/entities/Address'

export interface AddressDTO
  extends Omit<
    Address,
    'addressable_id' | 'addressable_type' | 'account_id' | 'is_main' | 'profile'
  > {}

class AddressMapper {
  static toDTO(addressRaw: Address): AddressDTO {
    const {
      id,
      address,
      address_2,
      city,
      district,
      identifier,
      number,
      state,
      zip,
    } = addressRaw

    const addressDTO: AddressDTO = {
      id,
      address,
      address_2,
      city,
      district,
      identifier,
      number,
      state,
      zip,
    }

    return addressDTO
  }
}

export { AddressMapper }
