import { UserToken } from '../infra/typeorm/entities/UserToken'

export type ICreateUserToken = {
  token: string
  type?: 'refresh_token' | 'activation_token'
  expires_at: Date
  user_id: string
}

interface IUserTokensRepository {
  create(data: ICreateUserToken): Promise<UserToken>
  deleteUserRefreshTokens(user_id: string): Promise<void>
  deleteExpiredTokens(type?: Pick<ICreateUserToken, 'type'>): Promise<void>
  findByUserIdAndAccountIdAndToken(
    user_id: string,
    token: string
  ): Promise<UserToken>
  findByActivationToken(token: string): Promise<UserToken>
  deleteById(id: string): Promise<void>
}

export { IUserTokensRepository }
