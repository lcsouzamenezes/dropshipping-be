import { Listing } from '../infra/typeorm/entities/Listing'

interface IListingsRepository {
  getAll(account_id: string): Promise<Listing[]>

  create(data: {
    code: string
    integration_id: string
    active: boolean
    account_id: string
    products_id: string[]
    parent_code?: string
  }): Promise<Listing>

  delete(account_id: string, id: string): Promise<void>

  findByCode(code: string): Promise<Listing>

  findByParentCode(
    parent_code: string,
    options?: { relations: string[] }
  ): Promise<Listing[]>

  getByProductId(id: string, account_id: string): Promise<Listing[]>
}

export { IListingsRepository }
