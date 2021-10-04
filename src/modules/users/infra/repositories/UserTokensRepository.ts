import {
  ICreateUserToken,
  IUserTokensRepository,
} from '@modules/users/repositories/IUserTokensRepository'
import { getRepository, Repository } from 'typeorm'
import { UserToken } from '../typeorm/entities/UserToken'

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  async create(data: ICreateUserToken): Promise<UserToken> {
    const userToken = this.repository.create(data)
    await this.repository.save(userToken)
    return userToken
  }
  async deleteUserRefreshTokens(user_id: string): Promise<void> {
    await this.repository.delete({
      user_id,
      type: 'refresh_token',
    })
  }
  async deleteExpiredTokens(
    type?: Pick<ICreateUserToken, 'type'>
  ): Promise<void> {
    const query = this.repository
      .createQueryBuilder('tokens')
      .delete()
      .where('tokens.expires_at <= :currentDate', { currentDate: new Date() })

    if (query) {
      query.andWhere('tokens.type = :type', { type })
    }

    await query.execute()
  }

  async findByUserIdAndToken(
    user_id: string,
    token: string
  ): Promise<UserToken> {
    const tokenFound = await this.repository.findOne({ token, user_id })
    return tokenFound
  }
}

export { UserTokensRepository }
