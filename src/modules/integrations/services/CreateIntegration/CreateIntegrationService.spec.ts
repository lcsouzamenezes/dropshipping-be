import { IntegrationsRepository } from '@modules/integrations/repositories/in-memory/IntegrationsRepository'
import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { FakeDateProvider } from '@shared/providers/DateProvider/fakes/FakeDateProvider'
import {
  CreateIntegrationService,
  ICreateIntegration,
} from './CreateIntegrationService'

let integrationsRepository: IntegrationsRepository
let dateProvider: FakeDateProvider
let createMercadoLivreAccountService: CreateIntegrationService

describe('CreateIntegrationService', () => {
  beforeEach(() => {
    integrationsRepository = new IntegrationsRepository()
    dateProvider = new FakeDateProvider()
    createMercadoLivreAccountService = new CreateIntegrationService(
      integrationsRepository,
      dateProvider
    )
  })

  it('should be able to store a new mercadolivre_account', async () => {
    const data = {
      account_id: '23242341241421241',
      access_token: '35953383607603283203736170747409346891495852823131',
      refresh_token: '71186401000568730882195995319583',
      expires_at: 6 * 60 * 60, // 6 hours
      user_id: '9200946451',
    } as ICreateIntegration

    const mercadolivreAccount = await createMercadoLivreAccountService.execute(
      data
    )

    expect(mercadolivreAccount).toHaveProperty('id')
  })
})
