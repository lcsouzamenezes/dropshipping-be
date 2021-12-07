import { Listing } from '../infra/typeorm/entities/Listing'

interface IListingsRepository {
  create(data: {
    code: string
    integration_id: string
    active: boolean
    account_id: string
  }): Promise<Listing>
}

export { IListingsRepository }
