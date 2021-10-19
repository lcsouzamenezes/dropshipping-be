import { IntegrationsRepository } from '@modules/integrations/repositories/in-memory/IntegrationsRepository'
import { ListIntegrationsService } from './ListIntegrationsService'

let integrationsRepository: IntegrationsRepository
let listIntegrationsService: ListIntegrationsService

describe('ListIntegrationsService', () => {
  beforeAll(() => {
    integrationsRepository = new IntegrationsRepository()
    listIntegrationsService = new ListIntegrationsService(
      integrationsRepository
    )
  })

  it('should list all users integrations', async () => {
    const account_id = '86643025471171050853632925050751'

    for (let i = 1; i <= 5; i++) {
      integrationsRepository.create(
        {
          access_token: '62006587284628892929048720454285' + i,
          description: 'Teste Ingration ' + i,
          provider: 'mercadolivre',
          refresh_token: '12136652129969664372217216929123' + i,
          user_id: '12345' + i,
          expires_at: new Date(),
        },
        account_id
      )
    }

    integrationsRepository.create(
      {
        access_token: '88009994419654837740517773789802',
        description: 'Teste Ingration ',
        provider: 'mercadolivre',
        refresh_token: '45236119285890124977014131521674',
        user_id: '54321',
        expires_at: new Date(),
      },
      'another_account_id-293852531908'
    )

    const integrations = await listIntegrationsService.execute(account_id)

    expect(integrations).toHaveLength(5)
  })
})
