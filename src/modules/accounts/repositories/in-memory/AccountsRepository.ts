import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccountDTO'
import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { IAccountsRepository } from '../IAccountsRepository'

class AccountsRepository implements IAccountsRepository {
  private accounts: Account[] = []

  async create({
    email,
    name,
    password,
    active = true,
    type = 'seller',
  }: ICreateAccountDTO): Promise<Account> {
    const account = new Account()
    Object.assign(account, {
      email,
      name,
      password,
      active,
      type,
    })
    this.accounts.push(account)
    return account
  }

  async delete(id: string): Promise<void> {
    this.accounts = this.accounts.filter((account) => account.id !== id)
  }

  async findById(id: string): Promise<Account> {
    const account = this.accounts.find((account) => account.id === id)
    return account
  }

  async listAll(): Promise<Account[]> {
    return this.accounts
  }

  async listAvailableSuppliersByAccountId(
    account_id: string
  ): Promise<Account[]> {
    const accounts = this.accounts.filter(
      (account) =>
        account.id !== account_id &&
        account.active &&
        account.type === 'supplier'
    )

    return accounts
  }
}

export { AccountsRepository }
