import { Addressable } from '../infra/typeorm/entities/Address'

export interface CreateAddressDTO {
  identifier: string

  zip: number

  state: string

  city: string

  district: string

  address: string

  number: string

  address_2: string

  is_main?: boolean

  account_id: string

  addressable_id: string

  addressable_type: Addressable['addressable_type']
}
