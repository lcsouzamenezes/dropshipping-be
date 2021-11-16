import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string, account_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (!user || user.account_id !== account_id) {
      throw new AppError('User not found', 'delete_user:not_found', 404)
    }

    await this.usersRepository.delete(user_id)
  }
}

export { DeleteUserService }
