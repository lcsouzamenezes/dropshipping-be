import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

interface IUsersRepository {
  create({ email, password, account_id }: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string, options?: { relations: string[] }): Promise<User>
  getAll(options?: { relations: string[] }): Promise<User[]>
}

export { IUsersRepository }
