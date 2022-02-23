import { Address } from '@modules/addresses/infra/typeorm/entities/Address'
import { AddressMapper } from '@modules/addresses/mappers/AddressMapper'
import { ProfileMapper } from '@modules/profiles/mappers/ProfileMapper'
import { UserMapper } from '@modules/users/mappers/UserMapper'
import { AccountDTO } from '../dtos/AccountDTO'
import { Account } from '../infra/typeorm/entities/Account'

interface AccountMapperData extends Account {
  address?: Address
}

class AccountsMapper {
  static toDTO({
    id,
    name,
    type,
    profile,
    user,
    address,
  }: AccountMapperData): AccountDTO {
    const account = {
      id,
      name,
      type,
    } as AccountDTO

    if (profile) {
      const profileDTO = ProfileMapper.toDTO(profile)
      Object.assign(account, { profile: profileDTO })
    }

    if (address) {
      const addressDTO = AddressMapper.toDTO(address)
      Object.assign(account, { address: addressDTO })
    }

    if (user) {
      const userDTO = UserMapper.toDTO(user)
      Object.assign(account, { user: userDTO })
    }

    return account
  }
}

export { AccountsMapper }
