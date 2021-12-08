import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteListingService } from './DeleteListingService'

class DeleteListingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { id } = request.params

    const deleteListingService = container.resolve(DeleteListingService)

    await deleteListingService.execute(id, account_id)

    return response.status(204).send()
  }
}

export { DeleteListingController }
