import { ListSalesMetricsController } from '@modules/metrics/services/ListSalesMetricsService/ListSalesMetricsController'
import { Router } from 'express'

const metricsRoutes = Router()

const listSalesMetricsController = new ListSalesMetricsController()

metricsRoutes.get('/sales', listSalesMetricsController.handle)

export { metricsRoutes }
