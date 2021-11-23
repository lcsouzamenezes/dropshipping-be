import { Router } from 'express'

import { ListSuppliersController } from '@modules/accounts/services/ListSuppliers/ListSuppliersController'

const suppliersRoutes = Router()

const listSuppliersController = new ListSuppliersController()

suppliersRoutes.get('/', listSuppliersController.handle)

export { suppliersRoutes }
