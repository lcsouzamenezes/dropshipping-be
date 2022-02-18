import { AccountSupplierAuthorization } from '@modules/accounts/infra/typeorm/entities/AccountSupplierAuthorization'
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { IAccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizationsRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListSuppliersAuthorizationsService {
  constructor(
    @inject('AccountsSuppliersAuthorizationsRepository')
    private accountsSuppliersAuthorizationsRepository: IAccountsSuppliersAuthorizationsRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(id: string): Promise<AccountSupplierAuthorization[]> {
    let accountsAuthorizations: AccountSupplierAuthorization[]
    const account = await this.accountsRepository.findById(id)

    if (account.type === 'seller') {
      accountsAuthorizations =
        await this.accountsSuppliersAuthorizationsRepository.getByAccountId(id)
    } else {
      accountsAuthorizations =
        await this.accountsSuppliersAuthorizationsRepository.getBySupplierId(id)
    }

    return accountsAuthorizations
  }
}

export { ListSuppliersAuthorizationsService }
