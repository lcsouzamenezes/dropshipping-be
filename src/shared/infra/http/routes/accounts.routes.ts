import { CreateAccountController } from '@modules/accounts/services/CreateAccount/CreateAccountController'
import { ListAccountsController } from '@modules/accounts/services/ListAccounts/ListAccountsController'
import { Router } from 'express'
import { createAccountValidation } from '@modules/accounts/validations/createAccountValidation'
import { UpdateAuthorizationRequestController } from '@modules/accounts/services/UpdateAuthorizationRequest/UpdateAuthorizationRequestController'

const accountsRoutes = Router()

const listAccountsController = new ListAccountsController()
const createAccountController = new CreateAccountController()
const updateAuthorizationRequestController =
  new UpdateAuthorizationRequestController()

accountsRoutes.get('/', listAccountsController.handle)
accountsRoutes.post(
  '/',
  createAccountValidation,
  createAccountController.handle
)
accountsRoutes.patch('/authorize', updateAuthorizationRequestController.handle)

export { accountsRoutes }
