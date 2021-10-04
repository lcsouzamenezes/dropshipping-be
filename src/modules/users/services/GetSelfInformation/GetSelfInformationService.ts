import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { classToClass, classToPlain } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetSelfInformationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository
  ) {}

  async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id)
    const account = await this.accountRepository.findById(user.account_id)

    if (!user) {
      throw new AppError('User not found', 'user.not_found', 400)
    }

    return classToClass(user)
  }
}

export { GetSelfInformationService }
