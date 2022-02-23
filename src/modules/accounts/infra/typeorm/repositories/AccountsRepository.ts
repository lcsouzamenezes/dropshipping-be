import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccountDTO'
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { FindManyOptions, getRepository, Not, Repository } from 'typeorm'
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

  async listAll(options?: FindManyOptions): Promise<Account[]> {
    const accounts = await this.repostiory.find()
    return accounts
  }

  async listAvailableSuppliersByAccountId(
    account_id: string
  ): Promise<Account[]> {
    const query = this.repostiory.createQueryBuilder('accounts')

    query.leftJoinAndMapOne(
      'accounts.address',
      'accounts.addresses',
      'address',
      'address.is_main = TRUE'
    )

    query.where({
      id: Not(account_id),
      type: 'supplier',
      active: true,
    })

    console.log(query.getSql())

    const accounts = await query.getMany()

    return accounts
  }
}

export { AccountsRepository }
