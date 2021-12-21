import { container } from 'tsyringe'

import { ProfilesRepository } from '@modules/profiles/infra/typeorm/repositories/ProfilesRepository'
import { IProfilesRepository } from '@modules/profiles/repositories/IProfilesRepository'

container.registerSingleton<IProfilesRepository>(
  'ProfilesRepository',
  ProfilesRepository
)
