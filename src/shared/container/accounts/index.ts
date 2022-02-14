import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { AccountsRepository } from '@modules/accounts/infra/typeorm/repositories/AccountsRepository'

import { IAccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizationsRepository'
import { AccountsSuppliersAuthorizationsRepository } from '@modules/accounts/infra/typeorm/repositories/AccountsSuppliersAuthorizationsRepository'

import { container } from 'tsyringe'

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository
)

container.registerSingleton<IAccountsSuppliersAuthorizationsRepository>(
  'AccountsSuppliersAuthorizationsRepository',
  AccountsSuppliersAuthorizationsRepository
)
