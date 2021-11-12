import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface GetUserServiceData {
  user_id: string
  account_id: string
}

@injectable()
class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, account_id }: GetUserServiceData): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 'get_user:not_found', 404)
    }

    if (user.account_id !== account_id) {
      throw new AppError('User not found', 'get_user:not_found', 404)
    }

    return user
  }
}

export { GetUserService }
