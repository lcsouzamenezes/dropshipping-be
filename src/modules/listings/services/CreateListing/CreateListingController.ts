import { Listing } from '@modules/listings/infra/typeorm/entities/Listing'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateListingService } from './CreateListingService'

interface RequestBody {
  code: string
  integration_id: string
  active?: boolean
  product_id?: string
  variations?: Array<{
    variation_id: string
    product_id: string
  }>
}

class CreateListingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const { code, integration_id, active, product_id, variations } =
      request.body as RequestBody

    const createListingService = container.resolve(CreateListingService)
    let listings: Listing[] = []

    if (!variations) {
      const listing = await createListingService.execute({
        account_id,
        code,
        integration_id,
        product_id,
        active,
      })
      listings.push(listing)
    } else {
      for await (const variation of variations) {
        const listing = await createListingService.execute({
          account_id,
          code: `MLB${variation.variation_id}`,
          integration_id,
          product_id: variation.product_id,
          active,
          parent_code: code,
        })
        listings.push(listing)
      }
    }

    return response.json(listings)
  }
}

export { CreateListingController }
