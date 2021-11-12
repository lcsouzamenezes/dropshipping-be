import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

interface UpdateUserServiceData {
  id: string
  name: string
  email: string
  password?: string
  active: boolean
  account_id: string
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    name,
    email,
    active,
    password,
    account_id,
  }: UpdateUserServiceData): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found!', 'update_user:not_found', 404)
    }

    if (user.account_id !== account_id) {
      throw new AppError('User not found!', 'update_user:not_found', 404)
    }

    Object.assign(user, {
      name,
      email,
      active,
    })

    if (password) {
      const hashedPassword = await hash(password, 8)
      Object.assign(user, {
        password: hashedPassword,
      })
    }

    const updatedUser = await this.usersRepository.update(user)

    return updatedUser
  }
}

export { UpdateUserService }
