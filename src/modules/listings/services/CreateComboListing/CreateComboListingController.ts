import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateComboListingService } from './CreateComboListingService'

interface IRequestBody {
  code: string
  integration_id: string
  products: string[]
}

class CreateComboListingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { code, integration_id, products } = request.body as IRequestBody
    const createComboListingService = container.resolve(
      CreateComboListingService
    )
    const listing = await createComboListingService.execute({
      code,
      integration_id,
      products_id: products,
      account_id,
    })
    return response.json(listing)
  }
}

export { CreateComboListingController }
