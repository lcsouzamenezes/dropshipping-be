import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSalesService } from './ListSalesService'

export class ListSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const listSalesService = container.resolve(ListSalesService)

    const sales = await listSalesService.execute(account_id)

    return response.json(sales)
  }
}
