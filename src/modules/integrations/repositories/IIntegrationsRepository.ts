import { Integration } from '../infra/typeorm/entities/Integration'

export interface ICreate {
  description: string
  access_token: string
  expires_at?: Date
  user_id?: string
  refresh_token?: string
  provider: string
}

export interface IUpdate {
  description: string
  access_token: string
  expires_at?: Date
  user_id?: string
  refresh_token?: string
  provider: string
}

interface IIntegrationsRepository {
  create(data: ICreate, account_id: string): Promise<Integration>
  findByUserId(user_id: string): Promise<Integration>
  findByUserIdAndAccountId(
    user_id: string,
    account_id: string
  ): Promise<Integration>
  deleteById(id: string): Promise<void>
  findByAccountId(account_id: string, provider?: string): Promise<Integration[]>
  findById(id: string, account_id: string): Promise<Integration>
  update(integration: Integration): Promise<Integration>
}

export { IIntegrationsRepository }
