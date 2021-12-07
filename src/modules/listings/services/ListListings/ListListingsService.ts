import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListListingsService {
  constructor(
    @inject('ListingsRepository')
    private listingsRepository: IListingsRepository
  ) {}

  async execute(account_id: string) {
    const listings = await this.listingsRepository.getAll(account_id)
    return listings
  }
}

export { ListListingsService }
