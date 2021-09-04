import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { IAccountsRepository } from '../IAccountsRepository';

class AccountsRepository implements IAccountsRepository {
  private accounts: Account[] = [];

  async create(data: { name: string; type?: string }): Promise<Account> {
    const account = new Account();
    Object.assign(account, data);
    this.accounts.push(account);
    return account;
  }

  async delete(id: string): Promise<void> {
    this.accounts = this.accounts.filter((account) => account.id !== id);
  }
}

export { AccountsRepository };
