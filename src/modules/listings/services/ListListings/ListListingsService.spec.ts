import { ListingsRepository } from '@modules/listings/repositories/in-memory/ListingsRepository'
import { ListListingsService } from './ListListingsService'

let listingsRepository: ListingsRepository
let listListingsService: ListListingsService

describe('ListListings', () => {
  beforeEach(() => {
    listingsRepository = new ListingsRepository()
    listListingsService = new ListListingsService(listingsRepository)
  })

  it('should be able to list all listings from the account', async () => {
    const account_id = 'CLpORB7JFEDOFQ7YphlUG3GCtZHYgw4H'

    for (let i = 0; i < 5; i++) {
      await listingsRepository.create({
        account_id,
        active: true,
        code: 'SC1Hymk5lVOM' + i,
        products_id: ['Xgudv7zZvCLai1p57wapScApyiFLrL3X' + i],
        integration_id: 'zkHTHWYbsLJ0YJCbEpSprgvg2P0fWSn5',
      })
    }

    const listings = await listingsRepository.getAll(account_id)

    expect(listings).toHaveLength(5)
  })
})
