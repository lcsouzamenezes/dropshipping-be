import { Router } from 'express'

import { ListSuppliersController } from '@modules/accounts/services/ListSuppliers/ListSuppliersController'
import { RequestAutorizationController } from '@modules/accounts/services/RequestAutorization/RequestAutorizationController'

const suppliersRoutes = Router()

const listSuppliersController = new ListSuppliersController()
const requestAutorizationController = new RequestAutorizationController()

suppliersRoutes.get('/', listSuppliersController.handle)
suppliersRoutes.post(
  '/request/authorization',
  requestAutorizationController.handle
)

export { suppliersRoutes }
