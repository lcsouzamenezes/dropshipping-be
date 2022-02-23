import { ICreateSupplierAuthorizationDTO } from '../dtos/ICreateSupplierAuthorizationDTO'
import { AccountSupplierAuthorization } from '../infra/typeorm/entities/AccountSupplierAuthorization'

interface IAccountsSuppliersAuthorizationsRepository {
  getById(id: string): Promise<AccountSupplierAuthorization>
  getAuthorizedByAccountId(id: string): Promise<AccountSupplierAuthorization[]>
  getByAccountId(id: string): Promise<AccountSupplierAuthorization[]>
  getBySupplierId(id: string): Promise<AccountSupplierAuthorization[]>
  create(
    data: ICreateSupplierAuthorizationDTO
  ): Promise<AccountSupplierAuthorization>
  getByAccountIdAndSupplierId(data: {
    account_id: string
    supplier_id: string
  }): Promise<AccountSupplierAuthorization>
  updateAuthorized(
    authorization_id: string,
    authorized: boolean
  ): Promise<AccountSupplierAuthorization>
}

export { IAccountsSuppliersAuthorizationsRepository }
