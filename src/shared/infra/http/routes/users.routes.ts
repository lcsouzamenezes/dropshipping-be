import { CreateUserController } from '@modules/users/services/CreateUser/CreateUserController'
import { GetSelfInformationController } from '@modules/users/services/GetSelfInformation/GetSelfInformationController'
import { GetSelfPermissionsController } from '@modules/users/services/GetSelfPermissions/GetSelfPermissionsController'
import { ListUsersController } from '@modules/users/services/ListUsers/ListUsersController'
import { Router } from 'express'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated'
import { Paginate } from '../middlewares/PaginateMiddleware'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const getSelfInformationController = new GetSelfInformationController()
const getSelfPermissionsController = new GetSelfPermissionsController()

usersRoutes.get(
  '/',
  EnsureAuthenticated,
  Paginate(100),
  listUsersController.handle
)
usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/me', EnsureAuthenticated, getSelfInformationController.handle)
usersRoutes.get(
  '/me/permissions',
  EnsureAuthenticated,
  getSelfPermissionsController.handle
)

export { usersRoutes }
