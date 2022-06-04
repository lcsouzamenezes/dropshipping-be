import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSalesMetricsService } from './ListSalesMetricsService'

class ListSalesMetricsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const listSalesMetricsService = container.resolve(ListSalesMetricsService)

    const metrics = await listSalesMetricsService.execute(account_id)

    return response.json(metrics)
  }
}

export { ListSalesMetricsController }
