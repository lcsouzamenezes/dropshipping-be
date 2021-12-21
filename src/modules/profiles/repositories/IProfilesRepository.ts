import { ICreateProfileDTO } from '../dtos/ICreateProfileDTO'
import { IUpdateProfileDTO } from '../dtos/IUpdateProfileDTO'
import { Profile } from '../infra/typeorm/entities/Profile'

export interface IProfilesRepository {
  save(data: ICreateProfileDTO): Promise<Profile>

  update(profile: Profile): Promise<Profile>

  getAll(
    account_id: string,
    options?: { only_main?: boolean }
  ): Promise<Profile[]>

  getMain(account_id: string): Promise<Profile>
}
