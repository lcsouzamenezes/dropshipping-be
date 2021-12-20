import { Router } from 'express'
import { CreateProductsController } from '@modules/products/services/CreateProduct/CreateProductsController'
import { ImportProductsController } from '@modules/products/services/ImportProducts/ImportProductsController'
import { ListProductsController } from '@modules/products/services/ListProductsService/ListProductsController'

import { Paginate } from '../middlewares/PaginateMiddleware'

import { createProductValidation } from '@modules/products/validations/createProductValidation'
import { importProductsValidation } from '@modules/products/validations/importProductsValidation'
import { GetProductController } from '@modules/products/services/GetProduct/GetProductController'
import { UpdateProductController } from '@modules/products/services/UpdateProductService/UpdateProductController'
import { listProductsValidation } from '@modules/products/validations/listProductsValidation'

const productsRoutes = Router()

const getProductController = new GetProductController()
const updateProductController = new UpdateProductController()
const listUsersController = new ListProductsController()
const importProductsController = new ImportProductsController()
const createProductController = new CreateProductsController()

productsRoutes.get(
  '/',
  listProductsValidation,
  Paginate(100),
  listUsersController.handle
)

productsRoutes.get('/:id', getProductController.handle)
productsRoutes.put('/:id', updateProductController.handle)

productsRoutes.post(
  '/',
  createProductValidation,
  createProductController.execute
)

productsRoutes.post(
  '/import/:source?',
  importProductsValidation,
  importProductsController.handle
)

export { productsRoutes }
