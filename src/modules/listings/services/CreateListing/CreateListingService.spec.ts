import { IntegrationsRepository } from '@modules/integrations/repositories/in-memory/IntegrationsRepository'
import { ListingsRepository } from '@modules/listings/repositories/in-memory/ListingsRepository'
import { CreateListingService } from './CreateListingService'

let integrationsRepository: IntegrationsRepository
let listingsRepository: ListingsRepository
let createListingService: CreateListingService

describe('CreateListingService', () => {
  beforeEach(() => {
    integrationsRepository = new IntegrationsRepository()
    listingsRepository = new ListingsRepository()
    createListingService = new CreateListingService(
      integrationsRepository,
      listingsRepository
    )
  })

  it('should be able to create a new listing', async () => {
    const account_id = 'fewKi4BMy9gJPiL8fzPtyjvWZioseKpk'

    const integration = await integrationsRepository.create(
      {
        access_token: 'u1A2aEUhw2YSpFS8ZqkMXieWn9z8icd7',
        description: 'Integration',
        provider: 'mercadolivre',
      },
      account_id
    )

    const listing = await createListingService.execute({
      code: 'rOrZCv2H9eh8',
      account_id,
      integration_id: integration.id,
      product_id: 'iOpq3Rkojv0w3InQvOMfhv9O0c5z6gKh',
    })

    expect(listing).toHaveProperty('id')
  })

  it('should not be able to create a new listing with non existing integration', async () => {
    const account_id = 'fewKi4BMy9gJPiL8fzPtyjvWZioseKpk'

    await createListingService
      .execute({
        code: 'rOrZCv2H9eh8',
        account_id,
        integration_id: 'non-existing-integration-id',
        product_id: 'QYMt1HOXoJC3xAEdOZu4lzprEQ3izctK',
      })
      .catch((e) => expect(e.message).toBe('Integration not found'))
  })

  it('should not be able to create a new listing with existing code', async () => {
    const account_id = 'fewKi4BMy9gJPiL8fzPtyjvWZioseKpk'

    const integration = await integrationsRepository.create(
      {
        access_token: 'u1A2aEUhw2YSpFS8ZqkMXieWn9z8icd7',
        description: 'Integration',
        provider: 'mercadolivre',
      },
      account_id
    )

    await createListingService.execute({
      code: 'rOrZCv2H9eh8',
      account_id,
      integration_id: integration.id,
      product_id: 'iOpq3Rkojv0w3InQvOMfhv9O0c5z6gKh',
    })

    await expect(
      createListingService.execute({
        code: 'rOrZCv2H9eh8',
        account_id,
        integration_id: integration.id,
        product_id: 'QYMt1HOXoJC3xAEdOZu4lzprEQ3izctK',
      })
    ).rejects.toThrowError(/already exists/)
  })
})
