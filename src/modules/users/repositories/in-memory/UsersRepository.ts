import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  constructor(private accountsRepository?: IAccountsRepository) {
    if (!this.accountsRepository) {
      this.accountsRepository = new AccountsRepository()
    }
  }

  private users: User[] = []

  async create({ email, password, account_id }: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, { email, password, account_id })
    this.users.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    if (user) {
      user.account = await this.accountsRepository.findById(user.account_id)
    }
    return user
  }
}
export { UsersRepository }
