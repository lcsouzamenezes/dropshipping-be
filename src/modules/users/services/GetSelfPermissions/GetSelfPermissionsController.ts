import { AppError } from '@shared/errors/AppError'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSelfPermissionsService } from './GetSelfPermissionsService'

class GetSelfPermissionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const getSelfPermissions = container.resolve(GetSelfPermissionsService)
    const permissions = await getSelfPermissions.execute(id)

    if (!permissions) {
      throw new AppError('Permissions not found', 'permissions.not_found')
    }

    return response.json(permissions)
  }
}

export { GetSelfPermissionsController }
