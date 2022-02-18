import { ICreateSupplierAuthorizationDTO } from '@modules/accounts/dtos/ICreateSupplierAuthorizationDTO'
import { IAccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizationsRepository'
import { getRepository, Repository } from 'typeorm'
import { AccountSupplierAuthorization } from '../entities/AccountSupplierAuthorization'

class AccountsSuppliersAuthorizationsRepository
  implements IAccountsSuppliersAuthorizationsRepository
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
    const queryBuilder = this.repository.createQueryBuilder(
      'account_suppliers_authorization'
    )

    queryBuilder.leftJoinAndSelect(
      'account_suppliers_authorization.supplier',
      'supplier'
    )
    queryBuilder.leftJoinAndSelect(
      'account_suppliers_authorization.account',
      'account'
    )
    queryBuilder.where('account_id = :id', { id })

    return await queryBuilder.getMany()
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
  async getByAccountIdAndSupplierId({
    account_id,
    supplier_id,
  }: {
    account_id: string
    supplier_id: string
  }): Promise<AccountSupplierAuthorization> {
    return await this.repository.findOne({
      where: {
        account_id,
        supplier_id,
      },
    })
  }
  async updateAuthorized(
    authorization_id: string,
    authorized: boolean
  ): Promise<AccountSupplierAuthorization> {
    const authorization = await this.repository.findOne({
      id: authorization_id,
    })
    authorization.authorized = authorized
    await this.repository.save(authorization)
    return authorization
  }
}

export { AccountsSuppliersAuthorizationsRepository }
