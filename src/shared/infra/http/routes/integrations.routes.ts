import { createIntegration } from '@modules/integrations/validations/createIntegration'
import { CreateIntegrationServiceController } from '@modules/integrations/services/CreateIntegration/CreateIntegrationServiceController'
import { Router } from 'express'
import { ListIntegrationsController } from '@modules/integrations/services/ListIntegrations/ListIntegrationsController'
import { GetIntegrationController } from '@modules/integrations/services/GetIntegration/GetIntegrationController'
import { UpdateSettingsController } from '@modules/integrations/services/UpdateSettings/UpdateSettingsController'

const integrationsRoutes = Router()

const getIntegrationController = new GetIntegrationController()
const listIntegrationsController = new ListIntegrationsController()
const updateSettingsController = new UpdateSettingsController()
const createIntegrationServiceController =
  new CreateIntegrationServiceController()

integrationsRoutes.get('/', listIntegrationsController.handle)
integrationsRoutes.get('/:id', getIntegrationController.handle)

integrationsRoutes.patch('/:id/settings', updateSettingsController.handle)

integrationsRoutes.post(
  '/:provider',
  createIntegration,
  createIntegrationServiceController.handle
)

export { integrationsRoutes }
