import { IntegrationsRepository } from '@modules/integrations/repositories/in-memory/IntegrationsRepository'
import { UpdateSettingsService } from './UpdateSettingsService'

describe('UpdateSettings', () => {
  let integrationsRepository: IntegrationsRepository
  let updateSettingsService: UpdateSettingsService

  beforeEach(() => {
    integrationsRepository = new IntegrationsRepository()
    updateSettingsService = new UpdateSettingsService(integrationsRepository)
  })

  it('should be able to update integration settings', async () => {
    const account_id = 'rio7T87IFYpd'
    const integration = await integrationsRepository.create(
      {
        access_token: 'pwgUZJ2xWhIrPEh0dTVRgiwyxUEYUk9i',
        description: '',
        provider: 'bling',
      },
      account_id
    )

    const updatedIntegration = await updateSettingsService.execute({
      account_id,
      integration_id: integration.id,
      settings: {
        store_code: '123456',
      },
    })

    expect(JSON.parse(updatedIntegration.settings)).toHaveProperty('store_code')
  })
})
