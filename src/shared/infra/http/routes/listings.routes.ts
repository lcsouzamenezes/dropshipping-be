import { CreateListingController } from '@modules/listings/services/CreateListing/CreateListingController'
import { createListingValidation } from '@modules/listings/validations/createListingValidation'
import { Router } from 'express'

const listingsRoutes = Router()

const createListingController = new CreateListingController()

listingsRoutes.post(
  '/',
  createListingValidation,
  createListingController.handle
)

export { listingsRoutes }
