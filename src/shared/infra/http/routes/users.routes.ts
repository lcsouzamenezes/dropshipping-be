import { ActivateUserController } from '@modules/users/services/ActivateUser/ActivateUserController'
import { CreateUserController } from '@modules/users/services/CreateUser/CreateUserController'
import { GetSelfInformationController } from '@modules/users/services/GetSelfInformation/GetSelfInformationController'
import { GetSelfPermissionsController } from '@modules/users/services/GetSelfPermissions/GetSelfPermissionsController'
import { GetUserController } from '@modules/users/services/GetUser/GetUserController'
import { ListUsersController } from '@modules/users/services/ListUsers/ListUsersController'
import { Router } from 'express'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated'
import { Paginate } from '../middlewares/PaginateMiddleware'

import createUserValidation from '@modules/users/validations/createUserValidation'
import getUserValidation from '@modules/users/validations/getUserValidation'
import updateUserValidation from '@modules/users/validations/updateUserValidation'
import resetPasswordValidation from '@modules/users/validations/resetPasswordValidation'
import { UpdateUserController } from '@modules/users/services/UpdateUserService/UpdateUserController'
import { DeleteUserController } from '@modules/users/services/DeleteUserService/DeleteUserController'
import { SendResetPasswordController } from '@modules/users/services/SentResetPassword/SendResetPasswordController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const activateUserController = new ActivateUserController()
const listUsersController = new ListUsersController()
const getSelfInformationController = new GetSelfInformationController()
const getSelfPermissionsController = new GetSelfPermissionsController()
const getUserController = new GetUserController()
const deleteUserController = new DeleteUserController()
const sendResetPasswordController = new SendResetPasswordController()

usersRoutes.get(
  '/',
  EnsureAuthenticated,
  Paginate(100),
  listUsersController.handle
)
usersRoutes.get('/me', EnsureAuthenticated, getSelfInformationController.handle)

usersRoutes.get(
  '/:id',
  EnsureAuthenticated,
  getUserValidation,
  getUserController.handle
)

usersRoutes.delete('/:id', EnsureAuthenticated, deleteUserController.handle)

usersRoutes.put(
  '/:id',
  EnsureAuthenticated,
  updateUserValidation,
  updateUserController.handle
)

usersRoutes.post(
  '/reset-password',
  resetPasswordValidation,
  sendResetPasswordController.handle
)

usersRoutes.post(
  '/',
  createUserValidation,
  EnsureAuthenticated,
  createUserController.handle
)
usersRoutes.post('/activate', activateUserController.handle)
usersRoutes.get(
  '/me/permissions',
  EnsureAuthenticated,
  getSelfPermissionsController.handle
)

export { usersRoutes }
