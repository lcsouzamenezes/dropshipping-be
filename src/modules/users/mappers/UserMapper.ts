import { User } from '../infra/typeorm/entities/User'

class UserMapper {
  static toDTO({
    master,
    password,
    account_id,
    created_at,
    updated_at,
    ...user
  }: User) {
    return {
      ...user,
      created_at,
      updated_at,
    }
  }
}

export { UserMapper }
