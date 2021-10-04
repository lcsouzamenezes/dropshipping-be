import { CreateUserController } from '@modules/users/services/CreateUser/CreateUserController'
import { GetSelfInformationController } from '@modules/users/services/GetSelfInformation/GetSelfInformationController'
import { Router } from 'express'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const getSelfInformationController = new GetSelfInformationController()

usersRoutes.get('/', createUserController.handle)
usersRoutes.get('/me', EnsureAuthenticated, getSelfInformationController.handle)
usersRoutes.get(
  '/me/permissions',
  EnsureAuthenticated,
  getSelfInformationController.handle
)

export { usersRoutes }
