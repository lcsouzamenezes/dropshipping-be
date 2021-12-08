import { ListingsMapper } from '@modules/listings/mappers/ListingsMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListListingsService } from './ListListingsService'

class ListListingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const listListingsService = container.resolve(ListListingsService)

    const listings = await listListingsService.execute(account_id)

    const listingsDTO = listings.map((listing) => ListingsMapper.toDTO(listing))

    return response.json(listingsDTO)
  }
}

export { ListListingsController }
