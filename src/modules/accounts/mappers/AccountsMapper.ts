import { ProfileMapper } from '@modules/profiles/mappers/ProfileMapper'
import { UserMapper } from '@modules/users/mappers/UserMapper'
import { AccountDTO } from '../dtos/AccountDTO'
import { Account } from '../infra/typeorm/entities/Account'

class AccountsMapper {
  static toDTO({ id, name, type, profile, user }: Account): AccountDTO {
    const account = {
      id,
      name,
      type,
    } as AccountDTO

    if (profile) {
      const profileDTO = ProfileMapper.toDTO(profile)
      Object.assign(account, { profile: profileDTO })
    }

    if (user) {
      const userDTO = UserMapper.toDTO(user)
      Object.assign(account, { user: userDTO })
    }

    return account
  }
}

export { AccountsMapper }
