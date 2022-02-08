import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserService } from '../GetUser/GetUserService'

class SendResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    //TODO: Send activation Email

    return response.json()
  }
}

export { SendResetPasswordController }
