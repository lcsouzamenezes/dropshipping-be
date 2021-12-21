import { GetMainProfileController } from '@modules/profiles/services/GetMainProfileService/GetMainProfileController'
import { UpdateProfileController } from '@modules/profiles/services/UpdateProfileService/UpdateProfileController'
import { updateProfileValidation } from '@modules/profiles/validations/updateProfilesValidation'
import { Router } from 'express'

const profilesRoutes = Router()

const getMainProfileController = new GetMainProfileController()
const updateProfilesController = new UpdateProfileController()

profilesRoutes.get('/', getMainProfileController.execute)
profilesRoutes.post(
  '/',
  updateProfileValidation,
  updateProfilesController.handle
)

export { profilesRoutes }
