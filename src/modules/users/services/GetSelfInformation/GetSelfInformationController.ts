import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ObjectFlags } from 'typescript'
import { GetSelfPermissionsService } from '../GetSelfPermissions/GetSelfPermissionsService'
import { GetSelfInformationService } from './GetSelfInformationService'

class GetSelfInformationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { permissions } = request.query

    const getSelfInformationService = container.resolve(
      GetSelfInformationService
    )

    const selfInfo = await getSelfInformationService.execute(request.user.id)

    if (permissions === 'true') {
      const getSelfPermissions = container.resolve(GetSelfPermissionsService)
      const permissions = await getSelfPermissions.execute(request.user.id)
      Object.assign(selfInfo, {
        ...permissions,
      })
    }

    return response.json({ me: selfInfo })
  }
}

export { GetSelfInformationController }
