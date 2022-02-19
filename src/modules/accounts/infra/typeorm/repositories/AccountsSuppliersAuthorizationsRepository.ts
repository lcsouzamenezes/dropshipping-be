import { ICreateSupplierAuthorizationDTO } from '@modules/accounts/dtos/ICreateSupplierAuthorizationDTO'
import { IAccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizationsRepository'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { query } from 'express-validator'
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
    const queryBuilder = this.repository.createQueryBuilder('authorization')

    queryBuilder.leftJoinAndSelect('authorization.supplier', 'supplier')
    queryBuilder.leftJoinAndSelect('authorization.account', 'account')

    queryBuilder.leftJoinAndSelect('account.user', 'user')

    queryBuilder.where('authorization.account_id = :id', { id })

    queryBuilder.orderBy('user.created_at', 'ASC')

    return await queryBuilder.getMany()
  }
  async getBySupplierId(id: string): Promise<AccountSupplierAuthorization[]> {
    const queryBuilder = this.repository.createQueryBuilder('authorization')

    queryBuilder.leftJoinAndSelect('authorization.supplier', 'supplier')

    queryBuilder.leftJoinAndSelect('authorization.account', 'account')

    queryBuilder.leftJoinAndSelect('account.user', 'user')

    queryBuilder.where('supplier_id = :id', { id })

    queryBuilder.orderBy('user.created_at', 'ASC')

    return await queryBuilder.getMany()
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
