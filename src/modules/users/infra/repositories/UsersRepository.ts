import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { getRepository, Repository } from 'typeorm'
import { User } from '../typeorm/entities/User'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }
  async create({ email, password, account_id }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ email, password, account_id })
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
}

export { UsersRepository }
