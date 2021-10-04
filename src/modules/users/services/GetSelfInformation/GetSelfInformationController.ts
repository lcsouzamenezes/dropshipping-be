import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSelfInformationService } from './GetSelfInformationService'

class GetSelfInformationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getSelfInformationService = container.resolve(
      GetSelfInformationService
    )

    const selfInfo = await getSelfInformationService.execute(request.user.id)
    return response.json({ me: selfInfo })
  }
}

export { GetSelfInformationController }
