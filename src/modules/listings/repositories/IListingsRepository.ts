import { Listing } from '../infra/typeorm/entities/Listing'

interface IListingsRepository {
  getAll(account_id: string): Promise<Listing[]>

  create(data: {
    code: string
    integration_id: string
    active: boolean
    account_id: string
  }): Promise<Listing>
}

export { IListingsRepository }
