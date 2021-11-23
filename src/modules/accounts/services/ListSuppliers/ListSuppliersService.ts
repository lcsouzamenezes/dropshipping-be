import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListSuppliersService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(account_id: string) {
    const accounts =
      await this.accountsRepository.listAvailableSuppliersByAccountId(
        account_id
      )

    return accounts
  }
}

export { ListSuppliersService }
