import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { AccountsRepository } from '@modules/accounts/infra/typeorm/repositories/AccountsRepository'

import { IAccountsSuppliersAuthorizations } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizations'
import { AccountsSuppliersAuthorizations } from '@modules/accounts/infra/typeorm/repositories/AccountsSuppliersAuthorizations'

import { container } from 'tsyringe'

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository
)

container.registerSingleton<IAccountsSuppliersAuthorizations>(
  'AccountsSuppliersAuthorizations',
  AccountsSuppliersAuthorizations
)
