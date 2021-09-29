import { CreateAccountController } from '@modules/accounts/services/CreateAccount/CreateAccountController'
import { ListAccountsController } from '@modules/accounts/services/ListAccounts/ListAccountsController'
import { Router } from 'express'

const accountsRoutes = Router()

const listAccountsController = new ListAccountsController()
const createAccountController = new CreateAccountController()

accountsRoutes.get('/', listAccountsController.handle)
accountsRoutes.post('/', createAccountController.handle)

export { accountsRoutes }
