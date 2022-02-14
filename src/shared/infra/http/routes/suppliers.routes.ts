import { Router } from 'express'

import { ListSuppliersController } from '@modules/accounts/services/ListSuppliers/ListSuppliersController'
import { RequestAutorizationController } from '@modules/accounts/services/RequestAutorization/RequestAutorizationController'
import { ListSuppliersAuthorizationsController } from '@modules/accounts/services/ListSuppliersAuthorizations/ListSuppliersAuthorizationsController'

const suppliersRoutes = Router()

const listSuppliersController = new ListSuppliersController()
const requestAutorizationController = new RequestAutorizationController()
const listSuppliersAuthorizationsController =
  new ListSuppliersAuthorizationsController()

suppliersRoutes.get('/', listSuppliersController.handle)

suppliersRoutes.get(
  '/authotization-requests',
  listSuppliersAuthorizationsController.handle
)

suppliersRoutes.post(
  '/:id/request/authorization',
  requestAutorizationController.handle
)
export { suppliersRoutes }
