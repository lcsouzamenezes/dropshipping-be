import { IntegrationsRepository } from '@modules/integrations/repositories/in-memory/IntegrationsRepository'
import { GetIntegrationService } from './GetIntegrationService'

let integrationsRepository: IntegrationsRepository
let getIntegrationService: GetIntegrationService

describe('GetIntegrationService', () => {
  beforeEach(() => {
    integrationsRepository = new IntegrationsRepository()
    getIntegrationService = new GetIntegrationService(integrationsRepository)
  })

  it('shoul be able to list specific integration', async () => {
    const account_id = '23435978772593580035149421482739'

    const newIntegration = await integrationsRepository.create(
      {
        access_token: '30557994651220218727692836957204',
        description: 'Mercado Livre teste',
        provider: 'mercadolivre',
        expires_at: new Date(),
        refresh_token: '62740168303286036009557948158636',
        user_id: '12345',
      },
      account_id
    )

    await integrationsRepository.create(
      {
        access_token: '69138212016709941003433615071572',
        description: 'Mercado Livre teste 2',
        provider: 'mercadolivre',
        expires_at: new Date(),
        refresh_token: '36096395623469019440846979813196',
        user_id: '497310',
      },
      '3412321321'
    )

    const integration = await getIntegrationService.execute(
      newIntegration.id,
      account_id
    )

    expect(integration).toHaveProperty('access_token')
  })

  it('should not be able to find non existing integration', async () => {
    const account_id = '23435978772593580035149421482739'

    await integrationsRepository.create(
      {
        access_token: '30557994651220218727692836957204',
        description: 'Mercado Livre teste',
        provider: 'mercadolivre',
        expires_at: new Date(),
        refresh_token: '62740168303286036009557948158636',
        user_id: '12345',
      },
      account_id
    )

    const getIntegration = async () => {
      await getIntegrationService.execute('not-existing-id', account_id)
    }
    await expect(getIntegration).rejects.toThrow('Integration not found!')
  })
})
