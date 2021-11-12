import { hash } from 'bcryptjs'
import { container, inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import { AppError } from '@errors/AppError'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    name,
    email,
    password,
    account_id,
    active,
  }: ICreateUserDTO): Promise<User> {
    const hashedPassword = await hash(password, 8)
    const userExist = await this.usersRepository.findByEmail(email)

    if (userExist) {
      throw new AppError('E-mail already taken', 'users.exists', 409)
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      account_id,
      active,
    })
    return user
  }
}

export { CreateUserService }
