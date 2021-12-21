import { Address } from '@modules/addresses/infra/typeorm/entities/Address'
import { ICacheProvider } from '@shared/providers/CacheProvider/ICacheProvider'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { Profile } from '../../infra/typeorm/entities/Profile'
import { GetMainProfileService } from './GetMainProfileService'

export class GetMainProfileController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    let serviceResponse: {
      profile: Profile
      address: Address
    }

    const cache = container.resolve<ICacheProvider>('CacheProvider')
    const getProfilesService = container.resolve(GetMainProfileService)

    const cachedProfiles = await cache.get<typeof serviceResponse>(
      `profile-${account_id}`
    )

    if (!cachedProfiles) {
      serviceResponse = await getProfilesService.execute(account_id)
      await cache.set<typeof serviceResponse>(
        `profile-${account_id}`,
        serviceResponse
      )
    } else {
      serviceResponse = cachedProfiles
    }

    return response.json(serviceResponse)
  }
}
