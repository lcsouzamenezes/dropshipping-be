import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateRecoveryPasswordService } from './UpdateRecoveryPasswordService'

class UpdateRecoveryPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, token, password } = request.body

    const updateRecoveryPasswordService = container.resolve(
      UpdateRecoveryPasswordService
    )
    await updateRecoveryPasswordService.execute({
      user_id,
      token,
      password,
    })

    return response.send()
  }
}

export { UpdateRecoveryPasswordController }
