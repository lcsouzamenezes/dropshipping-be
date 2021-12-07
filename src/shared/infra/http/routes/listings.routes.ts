import { CreateListingController } from '@modules/listings/services/CreateListing/CreateListingController'
import { ListListingsController } from '@modules/listings/services/ListListings/ListListingsController'
import { createListingValidation } from '@modules/listings/validations/createListingValidation'
import { Router } from 'express'
import { Paginate } from '../middlewares/PaginateMiddleware'

const listingsRoutes = Router()

const listListingsController = new ListListingsController()
const createListingController = new CreateListingController()

listingsRoutes.get('/', Paginate(100), listListingsController.handle)

listingsRoutes.post(
  '/',
  createListingValidation,
  createListingController.handle
)

export { listingsRoutes }
