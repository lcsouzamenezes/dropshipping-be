import { AddressesRepository } from '@modules/addresses/repositories/in-memory/AddressesRepository'
import { ProfilesRepository } from '@modules/profiles/repositories/in-memory/ProfilesRepository'
import { UpdateProfileService } from './UpdateProfileService'

let profilesRepository: ProfilesRepository
let addressesRepository: AddressesRepository
let updateProfileService: UpdateProfileService

describe('UpdateProfileService', () => {
  beforeEach(() => {
    profilesRepository = new ProfilesRepository()
    addressesRepository = new AddressesRepository()
    updateProfileService = new UpdateProfileService(
      profilesRepository,
      addressesRepository
    )
  })

  it('should be able to create a profile when do not exist one', async () => {
    const account_id = '10061160261964621221383076205193'

    const data = await updateProfileService.execute({
      account_id,
      address: 'Teste Av.',
      city: 'Test',
      district: 'Test district',
      document_number: 12345,
      identifier: 'Teste',
      is_company: true,
      name: 'Test Company',
      state: 'CA',
      number: '213',
      zip: 1233221,
    })

    expect(data).toHaveProperty('profile')
    expect(data).toHaveProperty('address')
  })
})
