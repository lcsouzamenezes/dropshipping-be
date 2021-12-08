import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteListingService {
  constructor(
    @inject('ListingsRepository')
    private listingsRepository: IListingsRepository
  ) {}

  async execute(id: string, account_id: string): Promise<void> {
    console.log(id, account_id)
    await this.listingsRepository.delete(account_id, id)
  }
}
export { DeleteListingService }
