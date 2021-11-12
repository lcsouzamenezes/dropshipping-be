import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

interface IUsersRepository {
  create({
    name,
    email,
    password,
    account_id,
    active,
  }: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string, options?: { relations: string[] }): Promise<User>
  getAll(options?: { relations: string[] }): Promise<User[]>
  update(user: User): Promise<User>
}

export { IUsersRepository }
