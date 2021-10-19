import { container } from 'tsyringe'

import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { IntegrationsRepository } from '@modules/integrations/infra/typeorm/repositories/IntegrationsRepository'

container.registerSingleton<IIntegrationsRepository>(
  'IntegrationsRepository',
  IntegrationsRepository
)
