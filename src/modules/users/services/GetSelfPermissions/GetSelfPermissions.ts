import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetSelfPermissions {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(user_id: string): Promise<string[]> {
    const user = await this.usersRepository.findById(user_id, {
      relations: ['account'],
    })

    if (!user) {
      throw new AppError('User not found!', 'user.not_found')
    }

    const roles = [user.account.type]

    if (user.master) {
      roles.push('master')
    }
    return roles
  }
}

export { GetSelfPermissions }
