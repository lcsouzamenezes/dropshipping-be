import { container } from 'tsyringe'

import { ListingsRepository } from '@modules/listings/infra/typeorm/repositories/ListingsRepository'
import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'

container.registerSingleton<IListingsRepository>(
  'ListingsRepository',
  ListingsRepository
)
