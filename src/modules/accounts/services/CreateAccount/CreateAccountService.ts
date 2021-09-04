import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccountDTO';
import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { CreateUserService } from '@modules/users/services/CreateUser/CreateUserService';
import { AppError } from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
    private createUserService?: CreateUserService
  ) {
    if (!this.createUserService) {
      this.createUserService = container.resolve(CreateUserService);
    }
  }

  async execute({
    name,
    type = 'client',
    email,
    password,
  }: ICreateAccountDTO): Promise<Account> {
    const account = await this.accountsRepository.create({ name, type });

    try {
      this.createUserService.execute({
        account_id: account.id,
        email,
        password,
      });
    } catch (err) {
      await this.accountsRepository.delete(account.id);
      throw err;
    }

    return account;
  }
}

export { CreateAccountService };
