import { ListSuppliersProductsController } from '@modules/products/services/ListSuppliersProductsService/ListSuppliersProductsController'
import { Router } from 'express'
import { Paginate } from '../middlewares/PaginateMiddleware'

const listSuppliersProductsService = new ListSuppliersProductsController()

const catalogRoutes = Router()

catalogRoutes.get('/', Paginate(100), listSuppliersProductsService.handle)

export { catalogRoutes }
