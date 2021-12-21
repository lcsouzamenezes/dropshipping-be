import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'
import { inject, injectable } from 'tsyringe'
import { IProfilesRepository } from '../../repositories/IProfilesRepository'

@injectable()
export class GetMainProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository
  ) {}

  async execute(account_id: string) {
    const profile = await this.profilesRepository.getMain(account_id)
    const address = await this.addressesRepository.getMain(
      account_id,
      'profiles'
    )

    return { profile, address }
  }
}
