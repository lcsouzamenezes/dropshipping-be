import { ICreateSupplierAuthorizationDTO } from '@modules/accounts/dtos/ICreateSupplierAuthorizationDTO'
import { AccountSupplierAuthorization } from '@modules/accounts/infra/typeorm/entities/AccountSupplierAuthorization'
import { IAccountsSuppliersAuthorizationsRepository } from '../IAccountsSuppliersAuthorizationsRepository'

class AccountsSuppliersAuthorizationsRepository
  implements IAccountsSuppliersAuthorizationsRepository
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
      (authorization) => authorization.account_id === id
    )
  }
  async getBySupplierId(id: string): Promise<AccountSupplierAuthorization[]> {
    return this.authorizations.filter(
      (authorization) => authorization.supplier_id === id
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

  async getByAccountIdAndSupplierId(data: {
    account_id: string
    supplier_id: string
  }): Promise<AccountSupplierAuthorization> {
    return this.authorizations.find(
      (authorization) =>
        authorization.supplier_id === data.supplier_id &&
        authorization.account_id === data.account_id
    )
  }
  async updateAuthorized(
    authorization_id: string,
    authorized: boolean
  ): Promise<AccountSupplierAuthorization> {
    const authorizationIndex = this.authorizations.findIndex(
      (authorization) => authorization.id === authorization_id
    )
    this.authorizations[authorizationIndex].authorized = authorized
    return this.authorizations[authorizationIndex]
  }
}

export { AccountsSuppliersAuthorizationsRepository }
