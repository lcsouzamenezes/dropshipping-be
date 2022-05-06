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
    const { code, integration_id, products } = request.body as IRequestBody
    const createComboListingService = container.resolve(
      CreateComboListingService
    )
    await createComboListingService.execute({ code, integration_id, products })
    return response.json({ ok: true })
  }
}

export { CreateComboListingController }
