import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { getRepository, Repository } from 'typeorm'
import { User } from '../typeorm/entities/User'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    name,
    email,
    password,
    account_id,
    active = false,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      account_id,
      active,
    })
    return await this.repository.save(user)
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne(
      { email },
      { relations: ['account'] }
    )
    return user
  }

  async findById(id: string, options?: { relations: string[] }): Promise<User> {
    const user = await this.repository.findOne(id, { ...options })
    return user
  }

  async getAll(
    account_id: string,
    options?: { relations: string[] }
  ): Promise<any> {
    const users = await this.repository
      .createQueryBuilder('user')
      .where('account_id = :account_id', { account_id })
      .paginate()
    return users
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.repository.save(user)
    return updatedUser
  }

  async delete(user_id: string): Promise<void> {
    await this.repository.delete(user_id)
  }
}

export { UsersRepository }
