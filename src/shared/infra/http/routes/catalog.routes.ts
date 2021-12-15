import { ListSuppliersProductsController } from '@modules/products/services/ListSuppliersProductsService/ListSuppliersProductsController'
import { listSupplierProductsValidation } from '@modules/products/validations/listSupplierProductsValidation'
import { Router } from 'express'
import { Paginate } from '../middlewares/PaginateMiddleware'

const listSuppliersProductsService = new ListSuppliersProductsController()

const catalogRoutes = Router()

catalogRoutes.get(
  '/',
  listSupplierProductsValidation,
  Paginate(100),
  listSuppliersProductsService.handle
)

export { catalogRoutes }
