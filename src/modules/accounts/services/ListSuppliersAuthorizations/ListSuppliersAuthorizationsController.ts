import { AuthorizationRequestMapper } from '@modules/accounts/mappers/AuthorizationRequestMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSuppliersAuthorizationsService } from './ListSuppliersAuthorizationsService'

class ListSuppliersAuthorizationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const listSuppliersAuthorizationsService = container.resolve(
      ListSuppliersAuthorizationsService
    )

    const requests = await listSuppliersAuthorizationsService.execute(
      account_id
    )

    const requestsDTO = requests.map((request) =>
      AuthorizationRequestMapper.toDTO(request)
    )

    return response.json(requestsDTO)
  }
}

export { ListSuppliersAuthorizationsController }
