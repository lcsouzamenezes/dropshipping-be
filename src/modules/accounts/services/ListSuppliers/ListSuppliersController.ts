import { AccountsMapper } from '@modules/accounts/mappers/AccountsMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSuppliersService } from './ListSuppliersService'

class ListSuppliersController {
  async handle(request: Request, response: Response) {
    const listSuppliersService = container.resolve(ListSuppliersService)

    const { account_id } = request.user

    const accounts = await listSuppliersService.execute(account_id)

    const accountsDTO = accounts.map((account) => AccountsMapper.toDTO(account))

    return response.json(accountsDTO)
  }
}

export { ListSuppliersController }
