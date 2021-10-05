import { CreateUserController } from '@modules/users/services/CreateUser/CreateUserController'
import { GetSelfInformationController } from '@modules/users/services/GetSelfInformation/GetSelfInformationController'
import { GetSelfPermissionsController } from '@modules/users/services/GetSelfPermissions/GetSelfPermissionsController'
import { Router } from 'express'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const getSelfInformationController = new GetSelfInformationController()
const getSelfPermissionsController = new GetSelfPermissionsController()

usersRoutes.get('/', createUserController.handle)
usersRoutes.get('/me', EnsureAuthenticated, getSelfInformationController.handle)
usersRoutes.get(
  '/me/permissions',
  EnsureAuthenticated,
  getSelfPermissionsController.handle
)

export { usersRoutes }
