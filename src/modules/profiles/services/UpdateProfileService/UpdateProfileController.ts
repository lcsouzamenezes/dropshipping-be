import { IUpdateProfileDTO } from '@modules/profiles/dtos/IUpdateProfileDTO'
import { ICacheProvider } from '@shared/providers/CacheProvider/ICacheProvider'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProfileService } from './UpdateProfileService'

export class UpdateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const {
      name,
      is_company,
      address,
      city,
      document: document_number,
      number,
      district,
      state,
      state_subscription_number,
      zip,
      address_2,
      city_subscription_number,
      nickname,
    } = request.body

    const updateProfileService = container.resolve(UpdateProfileService)

    const data = await updateProfileService.execute({
      account_id,
      name,
      nickname,
      is_company: is_company === 'true',
      document_number,
      state_subscription_number,
      city_subscription_number,
      zip,
      state,
      city,
      district,
      address,
      number,
      address_2,
      identifier: 'Profile',
    })

    // Clear cache
    const cache = container.resolve<ICacheProvider>('CacheProvider')
    await cache.unset(`profile-${account_id}`)

    return response.json(data)
  }
}
