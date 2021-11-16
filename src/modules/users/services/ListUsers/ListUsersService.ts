import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(account_id: string, page = 1): Promise<User[]> {
    const users = await this.usersRepository.getAll(account_id)

    return users
  }
}

export { ListUsersService }
