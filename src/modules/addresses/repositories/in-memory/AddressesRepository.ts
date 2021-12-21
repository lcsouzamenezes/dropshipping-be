import { CreateAddressDTO } from '@modules/addresses/dtos/CreateAddressDTO'
import { UpdateAddressDTO } from '@modules/addresses/dtos/UpdateAddressDTO'
import {
  Address,
  Addressable,
} from '@modules/addresses/infra/typeorm/entities/Address'
import { IAddressesRepository } from '../IAddressesRepository'

export class AddressesRepository implements IAddressesRepository {
  private addresses: Address[] = []

  async save(data: CreateAddressDTO): Promise<Address> {
    const address = new Address()
    Object.assign(address, {
      ...data,
    })
    this.addresses.push(address)

    return address
  }
  async update(address: UpdateAddressDTO): Promise<Address> {
    const addressIndex = this.addresses.findIndex(
      (findAddress) => findAddress.id === address.id
    )

    this.addresses[addressIndex] = address

    return address
  }

  async getMain(
    account_id: string,
    type: Addressable['addressable_type']
  ): Promise<Address> {
    const address = this.addresses.find(
      (address) =>
        address.is_main &&
        address.account_id === account_id &&
        address.addressable_type === type
    )

    return address
  }
}
