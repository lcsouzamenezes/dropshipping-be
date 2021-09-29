import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAccountsService } from './ListAccountsService'

class ListAccountsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAccountsService = container.resolve(ListAccountsService)
    const accounts = await listAccountsService.execute()
    return response.json({ accounts })
  }
}

export { ListAccountsController }
