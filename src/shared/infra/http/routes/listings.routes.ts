import { CreateComboListingController } from '@modules/listings/services/CreateComboListing/CreateComboListingController'
import { CreateListingController } from '@modules/listings/services/CreateListing/CreateListingController'
import { DeleteListingController } from '@modules/listings/services/DeleteListing/DeleteListingController'
import { ListListingsController } from '@modules/listings/services/ListListings/ListListingsController'
import { createListingValidation } from '@modules/listings/validations/createListingValidation'
import { Router } from 'express'
import { Paginate } from '../middlewares/PaginateMiddleware'

const listingsRoutes = Router()

const listListingsController = new ListListingsController()
const createListingController = new CreateListingController()
const deleteListingController = new DeleteListingController()
const createComboListingController = new CreateComboListingController()

listingsRoutes.get('/', Paginate(100), listListingsController.handle)

listingsRoutes.post('/combo', createComboListingController.handle)

listingsRoutes.post(
  '/',
  createListingValidation,
  createListingController.handle
)

listingsRoutes.delete('/:id', deleteListingController.handle)

export { listingsRoutes }
