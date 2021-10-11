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
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password, account_id })
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

  async getAll(options?: { relations: string[] }): Promise<any> {
    const users = await this.repository.createQueryBuilder('user').paginate()
    return users
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.repository.save(user)
    return updatedUser
  }
}

export { UsersRepository }
