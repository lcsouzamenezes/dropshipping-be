import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SendResetPasswordService } from './SendResetPasswordService'

class SendResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, redirectUrl } = await request.body

    const sendResetPasswordService = container.resolve(SendResetPasswordService)
    await sendResetPasswordService.execute(email, redirectUrl)

    return response.send()
  }
}

export { SendResetPasswordController }
