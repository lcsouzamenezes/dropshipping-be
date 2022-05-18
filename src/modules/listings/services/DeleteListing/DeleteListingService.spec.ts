import { ListingsRepository } from '@modules/listings/repositories/in-memory/ListingsRepository'
import { DeleteListingService } from './DeleteListingService'

let listingsRepository: ListingsRepository
let deleteListingService: DeleteListingService

describe('DeleteListingService', () => {
  beforeEach(() => {
    listingsRepository = new ListingsRepository()
    deleteListingService = new DeleteListingService(listingsRepository)
  })

  it('should be able to delete a listing', async () => {
    const account_id = 'rw8eRXRp6wwrerDw7C4atQTXQdied2oQ'

    const listing = await listingsRepository.create({
      account_id,
      active: true,
      code: 'ojtXl2IQnN58',
      integration_id: '1GEVow1i6azY4eEQNQeUXVTHeBWAEoQS',
      products_id: ['CcSrK8buwISwFDZpS0MciSPzZ2WJYloW'],
    })

    await deleteListingService.execute(listing.id, account_id)

    const listings = await listingsRepository.getAll(account_id)
    expect(listings).toHaveLength(0)
  })
})
