import { ICreateProfileDTO } from '@modules/profiles/dtos/ICreateProfileDTO'
import { IProfilesRepository } from '@modules/profiles/repositories/IProfilesRepository'
import { getRepository, Repository } from 'typeorm'
import { Profile } from '../entities/Profile'

export class ProfilesRepository implements IProfilesRepository {
  private repository: Repository<Profile>

  constructor() {
    this.repository = getRepository(Profile)
  }

  async save(data: ICreateProfileDTO): Promise<Profile> {
    const profile = this.repository.create()
    Object.assign(profile, data)
    return await this.repository.save(profile)
  }
  async getAll(
    account_id: string,
    options?: { only_main?: boolean }
  ): Promise<Profile[]> {
    const query = this.repository.createQueryBuilder('profiles')

    query.where('account_id = :account_id', { account_id })

    if (options) {
      if (options.only_main) {
        query.andWhere('is_main = true')
      }
    }

    const profiles = await query.getMany()

    return profiles
  }

  async update(profile: Profile): Promise<Profile> {
    return await this.repository.save(profile)
  }
  async getMain(account_id: string): Promise<Profile> {
    return await this.repository.findOne({
      account_id,
      is_main: true,
    })
  }
}
