import { UserMapper } from '@modules/users/mappers/UserMapper'
import { AccountDTO } from '../dtos/AccountDTO'
import { Account } from '../infra/typeorm/entities/Account'

class AccountsMapper {
  static toDTO({ id, name, type, user }: Account): AccountDTO {
    const account = {
      id,
      name,
      type,
    } as AccountDTO

    if (user) {
      const userDTO = UserMapper.toDTO(user)
      Object.assign(account, { user: userDTO })
    }

    return account
  }
}

export { AccountsMapper }
