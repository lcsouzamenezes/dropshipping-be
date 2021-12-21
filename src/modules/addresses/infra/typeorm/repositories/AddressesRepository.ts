import { CreateAddressDTO } from '@modules/addresses/dtos/CreateAddressDTO'
import { UpdateAddressDTO } from '@modules/addresses/dtos/UpdateAddressDTO'
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'
import { getRepository, Repository } from 'typeorm'
import { Address, Addressable } from '../entities/Address'

export class AddressesRepository implements IAddressesRepository {
  private repository: Repository<Address>

  constructor() {
    this.repository = getRepository(Address)
  }

  async save(data: CreateAddressDTO): Promise<Address> {
    const address = this.repository.create()
    Object.assign(address, data)
    return await this.repository.save(address)
  }
  async getMain(
    account_id: string,
    type: Addressable['addressable_type']
  ): Promise<Address> {
    return await this.repository.findOne({
      where: {
        account_id,
        is_main: true,
        addressable_type: type,
      },
    })
  }

  async update(data: UpdateAddressDTO): Promise<Address> {
    return await this.repository.save(data)
  }
}
