import { ListSalesController } from '@modules/sales/services/ListSalesService/ListSalesController'
import { Router } from 'express'
import { Paginate } from '../middlewares/PaginateMiddleware'

const listSalesController = new ListSalesController()

const salesRoutes = Router()

salesRoutes.get('/', Paginate(100), listSalesController.handle)

export { salesRoutes }
