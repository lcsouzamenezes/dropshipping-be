import { ICreateSupplierAuthorizationDTO } from '../dtos/ICreateSupplierAuthorizationDTO'
import { AccountSupplierAuthorization } from '../infra/typeorm/entities/AccountSupplierAuthorization'

interface IAccountsSuppliersAuthorizations {
  getById(id: string): Promise<AccountSupplierAuthorization>
  getByAccountId(id: string): Promise<AccountSupplierAuthorization[]>
  getBySupplierId(id: string): Promise<AccountSupplierAuthorization[]>
  create(
    data: ICreateSupplierAuthorizationDTO
  ): Promise<AccountSupplierAuthorization>
}

export { IAccountsSuppliersAuthorizations }
