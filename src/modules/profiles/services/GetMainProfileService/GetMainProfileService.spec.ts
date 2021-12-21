import { AddressesRepository } from '@modules/addresses/repositories/in-memory/AddressesRepository'
import { ProfilesRepository } from '../../repositories/in-memory/ProfilesRepository'
import { GetMainProfileService } from './GetMainProfileService'

let profilesRepository: ProfilesRepository
let addressesRepository: AddressesRepository
let getMainProfileService: GetMainProfileService

describe('GetMainProfileService', () => {
  beforeEach(() => {
    profilesRepository = new ProfilesRepository()
    addressesRepository = new AddressesRepository()
    getMainProfileService = new GetMainProfileService(
      profilesRepository,
      addressesRepository
    )
  })

  it('should be able to list all profiles from account', async () => {
    const account_id = 'r57jw4erQMTgELe7Tand3nFgMbw7VeTr'

    profilesRepository.save({
      name: 'Marvin Schultz',
      account_id,
      document_number: 129027612353,
      is_company: true,
      city_subscription_number: 12321321,
      state_subscription_number: 213213213,
      is_main: true,
    })

    profilesRepository.save({
      name: 'Marvin Schultz 2',
      account_id,
      document_number: 129027612353,
      is_company: true,
      city_subscription_number: 12321321,
      state_subscription_number: 213213213,
    })

    const data = await getMainProfileService.execute(account_id)

    expect(data.profile).toHaveProperty('id')
  })
})
