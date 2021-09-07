import { AccountsRepository } from '@modules/accounts/infra/typeorm/repositories/AccountsRepository';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository
);
