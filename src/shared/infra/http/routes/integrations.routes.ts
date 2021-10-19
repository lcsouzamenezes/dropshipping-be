import { createIntegration } from '@modules/integrations/validations/createIntegration'
import { CreateIntegrationServiceController } from '@modules/integrations/services/CreateIntegration/CreateIntegrationServiceController'
import { Router } from 'express'
import { ListIntegrationsController } from '@modules/integrations/services/ListIntegrations/ListIntegrationsController'

const integrationsRoutes = Router()

const listIntegrationsController = new ListIntegrationsController()
const createIntegrationServiceController =
  new CreateIntegrationServiceController()

integrationsRoutes.get('/', listIntegrationsController.handle)

integrationsRoutes.post(
  '/:provider',
  createIntegration,
  createIntegrationServiceController.handle
)

export { integrationsRoutes }
