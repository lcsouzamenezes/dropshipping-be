import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccountDTO'
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { getRepository, Repository } from 'typeorm'
import { Account } from '../entities/Account'

class AccountsRepository implements IAccountsRepository {
  private repostiory: Repository<Account>

  constructor() {
    this.repostiory = getRepository(Account)
  }

  async create({ name, type }: ICreateAccountDTO): Promise<Account> {
    const account = this.repostiory.create({
      name,
      type,
    })
    return await this.repostiory.save(account)
  }

  async delete(id: string): Promise<void> {
    await this.repostiory.delete(id)
  }

  async findById(id: string): Promise<Account> {
    const account = await this.repostiory.findOne(id)
    return account
  }
}

export { AccountsRepository }
