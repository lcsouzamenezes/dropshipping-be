import { CreateAddressDTO } from '../dtos/CreateAddressDTO'
import { Address, Addressable } from '../infra/typeorm/entities/Address'

export interface IAddressesRepository {
  save(data: CreateAddressDTO): Promise<Address>
  update(address: Address): Promise<Address>
  getMain(
    account_id: string,
    type: Addressable['addressable_type']
  ): Promise<Address>
}
