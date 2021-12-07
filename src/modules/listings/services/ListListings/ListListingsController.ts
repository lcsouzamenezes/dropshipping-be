import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListListingsService } from './ListListingsService'

class ListListingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const listListingsService = container.resolve(ListListingsService)

    const listings = await listListingsService.execute(account_id)

    return response.json(listings)
  }
}

export { ListListingsController }
