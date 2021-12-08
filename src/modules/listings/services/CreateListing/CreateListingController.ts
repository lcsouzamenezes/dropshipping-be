import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateListingService } from './CreateListingService'

interface RequestBody {
  code: string
  integration_id: string
  active?: boolean
  product_id: string
}

class CreateListingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const { code, integration_id, active, product_id } =
      request.body as RequestBody

    const createListingService = container.resolve(CreateListingService)

    const listing = await createListingService.execute({
      account_id,
      code,
      integration_id,
      product_id,
      active,
    })

    return response.json(listing)
  }
}

export { CreateListingController }
