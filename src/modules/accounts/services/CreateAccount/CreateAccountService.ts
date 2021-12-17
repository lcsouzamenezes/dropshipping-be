import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccountDTO'
import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { CreateUserService } from '@modules/users/services/CreateUser/CreateUserService'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { classToClass } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
    private createUserService?: CreateUserService
  ) {
    if (!this.createUserService) {
      this.createUserService = container.resolve(CreateUserService)
    }
  }

  async execute({
    company,
    name,
    email,
    password,
    type = 'seller',
    active = true,
    redirectUrl,
  }: ICreateAccountDTO): Promise<Account> {
    const events = container.resolve(EventProvider)

    const account = await this.accountsRepository.create({
      name: company,
      type,
      active,
    })
    try {
      const user = await this.createUserService.execute({
        account_id: account.id,
        name,
        email,
        password,
        active: false,
      })
      account.user = classToClass(user)

      events.emit('account-created', { account, redirectUrl })
    } catch (err) {
      await this.accountsRepository.delete(account.id)
      throw err
    }
    return account
  }
}

export { CreateAccountService }
