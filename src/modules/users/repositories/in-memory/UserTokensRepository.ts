import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken'
import {
  ICreateUserToken,
  IUserTokensRepository,
} from '../IUserTokensRepository'

class UserTokensRepository implements IUserTokensRepository {
  private tokens: UserToken[] = []

  async create({
    token,
    expires_at,
    user_id,
    type = 'activation_token',
  }: ICreateUserToken): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken, {
      token,
      expires_at,
      user_id,
      type,
    })
    this.tokens.push(userToken)
    return userToken
  }

  async deleteUserRefreshTokens(user_id: string): Promise<void> {
    const tokens = this.tokens.filter((token) => token.user_id !== user_id)
    this.tokens = tokens
  }

  async deleteExpiredTokens(
    type?: Pick<ICreateUserToken, 'type'>
  ): Promise<void> {
    const tokens = this.tokens.filter((token) => {
      if (type) {
        return !(token.expires_at < new Date() && token.type === type)
      }
      return !(token.expires_at < new Date())
    })
    this.tokens = tokens
  }
}

export { UserTokensRepository }
