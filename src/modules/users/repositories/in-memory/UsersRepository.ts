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

  async create({
    name,
    email,
    password,
    account_id,
  }: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, { name, email, password, account_id })
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

  async findById(id: string, options?: { relations: string[] }): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    if (options?.relations[0] === 'account') {
      user.account = await this.accountsRepository.findById(user.account_id)
    }
    return user
  }

  async getAll(options?: { relations: string[] }): Promise<User[]> {
    return this.users
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((findUser) => findUser.id === user.id)
    this.users[index] = user
    return user
  }
}
export { UsersRepository }
