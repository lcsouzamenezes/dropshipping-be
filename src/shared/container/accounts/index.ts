import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository
);
