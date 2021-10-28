import { ImportProductsController } from '@modules/products/services/ImportProducts/ImportProductsController'
import { importProducts } from '@modules/products/validations/importProducts'
import { Router } from 'express'

const productsRoutes = Router()

const importProductsController = new ImportProductsController()

productsRoutes.post(
  '/import/:source?',
  importProducts,
  importProductsController.handle
)

export { productsRoutes }
