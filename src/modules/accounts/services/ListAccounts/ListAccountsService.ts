import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListAccountsService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}
  async execute(): Promise<Account[]> {
    const accounts = await this.accountsRepository.listAll()
    return accounts
  }
}

export { ListAccountsService }
