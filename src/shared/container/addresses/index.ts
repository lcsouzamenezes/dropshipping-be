import { container } from 'tsyringe'

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'
import { AddressesRepository } from '@modules/addresses/infra/typeorm/repositories/AddressesRepository'

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository
)
