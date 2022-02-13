import { ICreateSupplierAuthorizationDTO } from '@modules/accounts/dtos/ICreateSupplierAuthorizationDTO'
import { AccountSupplierAuthorization } from '@modules/accounts/infra/typeorm/entities/AccountSupplierAuthorization'
import { IAccountsSuppliersAuthorizations } from '../IAccountsSuppliersAuthorizations'

class AccountsSuppliersAuthorizations
  implements IAccountsSuppliersAuthorizations
{
  private authorizations: AccountSupplierAuthorization[]

  constructor() {
    this.authorizations = []
  }

  async getById(id: string): Promise<AccountSupplierAuthorization> {
    return this.authorizations.find((authorization) => authorization.id === id)
  }
  async getByAccountId(id: string): Promise<AccountSupplierAuthorization[]> {
    return this.authorizations.filter(
      (authorization) => authorization.account_id !== id
    )
  }
  async getBySupplierId(id: string): Promise<AccountSupplierAuthorization[]> {
    return this.authorizations.filter(
      (authorization) => authorization.supplier_id !== id
    )
  }

  async create(
    data: ICreateSupplierAuthorizationDTO
  ): Promise<AccountSupplierAuthorization> {
    const { account_id, supplier_id, authorized } = data
    const supplierAuthorization = new AccountSupplierAuthorization()
    Object.assign(supplierAuthorization, {
      account_id,
      supplier_id,
      authorized,
    })
    this.authorizations.push(supplierAuthorization)
    return supplierAuthorization
  }
}

export { AccountsSuppliersAuthorizations }
