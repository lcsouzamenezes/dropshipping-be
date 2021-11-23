import { AccountDTO } from '../dtos/AccountDTO'
import { Account } from '../infra/typeorm/entities/Account'

class AccountsMapper {
  static toDTO({ id, name, type }: Account): AccountDTO {
    const account = {
      id,
      name,
      type,
    } as AccountDTO

    return account
  }
}

export { AccountsMapper }
