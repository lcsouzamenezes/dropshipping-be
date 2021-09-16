import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccountDTO';
import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { CreateUserService } from '@modules/users/services/CreateUser/CreateUserService';
import { classToClass } from 'class-transformer';
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
    email,
    password,
    type = 'client',
    active = true,
  }: ICreateAccountDTO): Promise<Account> {
    const account = await this.accountsRepository.create({
      name,
      type,
      active,
    });

    try {
      const user = await this.createUserService.execute({
        account_id: account.id,
        email,
        password,
      });
      account.user = classToClass(user);
    } catch (err) {
      await this.accountsRepository.delete(account.id);
      throw err;
    }

    return account;
  }
}

export { CreateAccountService };
