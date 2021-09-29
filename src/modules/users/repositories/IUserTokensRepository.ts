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
}

export { IUserTokensRepository }
