import { container } from 'tsyringe'

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository'

import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { UserTokensRepository } from '@modules/users/infra/repositories/UserTokensRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)
