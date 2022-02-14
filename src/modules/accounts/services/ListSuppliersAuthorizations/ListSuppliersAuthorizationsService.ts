import { AccountSupplierAuthorization } from '@modules/accounts/infra/typeorm/entities/AccountSupplierAuthorization'
import { IAccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizationsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListSuppliersAuthorizationsService {
  constructor(
    @inject('AccountsSuppliersAuthorizationsRepository')
    private accountsSuppliersAuthorizationsRepository: IAccountsSuppliersAuthorizationsRepository
  ) {}

  async execute(account_id: string): Promise<AccountSupplierAuthorization[]> {
    const accountsAuthorizations =
      await this.accountsSuppliersAuthorizationsRepository.getByAccountId(
        account_id
      )

    return accountsAuthorizations
  }
}

export { ListSuppliersAuthorizationsService }
