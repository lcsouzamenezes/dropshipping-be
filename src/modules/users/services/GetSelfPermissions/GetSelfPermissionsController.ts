import { AppError } from '@shared/errors/AppError'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSelfPermissionsService } from './GetSelfPermissionsService'

class GetSelfPermissionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body
    const getSelfPermissions = container.resolve(GetSelfPermissionsService)
    const permissions = await getSelfPermissions.execute(user_id)

    if (!permissions) {
      throw new AppError('Permissions not found', 'permissions.not_found')
    }

    return response.json(permissions)
  }
}

export { GetSelfPermissionsController }
