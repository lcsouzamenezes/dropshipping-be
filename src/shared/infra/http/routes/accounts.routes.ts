import { CreateAccountController } from '@modules/accounts/services/CreateAccount/CreateAccountController'
import { ListAccountsController } from '@modules/accounts/services/ListAccounts/ListAccountsController'
import { Router } from 'express'
import { createAccountValidation } from '../middlewares/validations/createAccountValidation'

const accountsRoutes = Router()

const listAccountsController = new ListAccountsController()
const createAccountController = new CreateAccountController()

accountsRoutes.get('/', listAccountsController.handle)
accountsRoutes.post(
  '/',
  createAccountValidation,
  createAccountController.handle
)

export { accountsRoutes }
