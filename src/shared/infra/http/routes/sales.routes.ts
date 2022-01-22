import { ListSalesController } from '@modules/sales/services/ListSalesService/ListSalesController'
import { UploadFilesController } from '@modules/sales/services/UploadFilesService/UploadFilesController'
import { Router } from 'express'
import { Paginate } from '../middlewares/PaginateMiddleware'
import uploadConfig from '@config/upload'
import multer from 'multer'

const listSalesController = new ListSalesController()
const uploadFilesController = new UploadFilesController()

const upload = multer(uploadConfig)
const salesRoutes = Router()

salesRoutes.get('/', Paginate(100), listSalesController.handle)

salesRoutes.patch(
  '/files',
  upload.fields([{ name: 'invoice' }, { name: 'label' }, { name: 'receipt' }]),
  uploadFilesController.handle
)

export { salesRoutes }
