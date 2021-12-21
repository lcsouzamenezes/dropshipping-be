import { ICreateProfileDTO } from '@modules/profiles/dtos/ICreateProfileDTO'
import { IUpdateProfileDTO } from '@modules/profiles/dtos/IUpdateProfileDTO'
import { Profile } from '@modules/profiles/infra/typeorm/entities/Profile'
import { profile } from 'console'
import { IProfilesRepository } from '../IProfilesRepository'

export class ProfilesRepository implements IProfilesRepository {
  private profiles: Profile[] = []

  async save({
    name,
    account_id,
    document_number,
    is_company,
    city_subscription_number,
    is_main = false,
    nickname,
    state_subscription_number,
  }: ICreateProfileDTO): Promise<Profile> {
    const profile = new Profile()

    Object.assign(profile, {
      name,
      account_id,
      document_number,
      is_company,
      city_subscription_number,
      is_main,
      nickname,
      state_subscription_number,
    })

    this.profiles.push(profile)

    return profile
  }

  async getAll(
    account_id: string,
    options?: {
      only_main?: boolean
    }
  ): Promise<Profile[]> {
    const profiles = this.profiles.filter((profile) => {
      if (profile.account_id !== account_id) {
        return false
      }

      if (options.only_main && !profile.is_main) {
        return false
      }

      return true
    })
    return profiles
  }

  async getMain(account_id: string): Promise<Profile> {
    const profile = this.profiles.find(
      (profile) => profile.is_main && profile.account_id === account_id
    )
    return profile
  }

  async update(profile: Profile): Promise<Profile> {
    const profileIndex = this.profiles.findIndex(
      (findProfile) => findProfile.id === profile.id
    )

    Object.assign(this.profiles[profileIndex], profile)

    return profile
  }
}
