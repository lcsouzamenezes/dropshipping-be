import { ICreateSupplierAuthorizationDTO } from '@modules/accounts/dtos/ICreateSupplierAuthorizationDTO'
import { IAccountsSuppliersAuthorizations } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizations'
import { getRepository, Repository } from 'typeorm'
import { AccountSupplierAuthorization } from '../entities/AccountSupplierAuthorization'

class AccountsSuppliersAuthorizations
  implements IAccountsSuppliersAuthorizations
{
  private repository: Repository<AccountSupplierAuthorization>

  constructor() {
    this.repository = getRepository(AccountSupplierAuthorization)
  }

  async getById(id: string): Promise<AccountSupplierAuthorization> {
    const accountSupplierAuthorization = await this.repository.findOne(id)
    return accountSupplierAuthorization
  }
  async getByAccountId(id: string): Promise<AccountSupplierAuthorization[]> {
    const accountSupplierAuthorization = await this.repository.find({
      account_id: id,
    })
    return accountSupplierAuthorization
  }
  async getBySupplierId(id: string): Promise<AccountSupplierAuthorization[]> {
    const accountSupplierAuthorization = await this.repository.find({
      supplier_id: id,
    })
    return accountSupplierAuthorization
  }
  async create({
    account_id,
    supplier_id,
    authorized,
  }: ICreateSupplierAuthorizationDTO): Promise<AccountSupplierAuthorization> {
    const accountSupplierAuthorization = this.repository.create({
      account_id,
      supplier_id,
      authorized,
    })
    return await this.repository.save(accountSupplierAuthorization)
  }
}

export { AccountsSuppliersAuthorizations }
