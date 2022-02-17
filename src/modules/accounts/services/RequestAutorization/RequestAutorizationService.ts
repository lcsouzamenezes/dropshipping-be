import { AccountSupplierAuthorization } from '@modules/accounts/infra/typeorm/entities/AccountSupplierAuthorization'
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { IAccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizationsRepository'
import { AppError } from '@shared/errors/AppError'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container, inject, injectable } from 'tsyringe'

@injectable()
class RequestAutorizationService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
    @inject('AccountsSuppliersAuthorizationsRepository')
    private accountsSuppliersAuthorizationsRepository: IAccountsSuppliersAuthorizationsRepository
  ) {}

  async execute(
    account_id: string,
    supplier_id: string
  ): Promise<AccountSupplierAuthorization> {
    const events = container.resolve(EventProvider)

    const account = await this.accountsRepository.findById(account_id)

    if (!account) {
      throw new AppError(
        'Account not found',
        'request_authorization:account_not_found',
        404
      )
    }
    if (account.type !== 'seller') {
      throw new AppError(
        'Account must be seller type',
        'request_authorization:incorrect_account_type',
        400
      )
    }

    const supplier = await this.accountsRepository.findById(supplier_id)

    if (!supplier) {
      throw new AppError(
        'Supplier Account not found',
        'request_authorization:supplier_not_found',
        404
      )
    }
    if (supplier.type !== 'supplier') {
      throw new AppError(
        'Supplier must be supplier type',
        'request_authorization:incorrect_supplier_type',
        400
      )
    }

    const authorizationExists =
      await this.accountsSuppliersAuthorizationsRepository.getByAccountIdAndSupplierId(
        {
          account_id,
          supplier_id,
        }
      )

    if (authorizationExists) {
      throw new AppError(
        'Authorization already requested',
        'request_authorization:authorization_already_requested',
        400
      )
    }

    const authorization =
      await this.accountsSuppliersAuthorizationsRepository.create({
        account_id: account.id,
        supplier_id: supplier.id,
        authorized: false,
      })

    events.emit('supplier-authorization-requested', {
      authorization,
      requester: account,
      supplier,
    })

    return authorization
  }
}

export { RequestAutorizationService }
