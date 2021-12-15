import { container } from 'tsyringe'

import { SalesRepository } from '@modules/sales/infra/typeorm/repositories/SalesRepository'
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository'

container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  SalesRepository
)
