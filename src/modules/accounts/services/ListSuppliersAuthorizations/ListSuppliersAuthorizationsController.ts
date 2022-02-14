import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSuppliersAuthorizationsService } from './ListSuppliersAuthorizationsService'

class ListSuppliersAuthorizationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    console.log(account_id)
    const listSuppliersAuthorizationsService = container.resolve(
      ListSuppliersAuthorizationsService
    )

    const requests = await listSuppliersAuthorizationsService.execute(
      account_id
    )

    return response.json(requests)
  }
}

export { ListSuppliersAuthorizationsController }
