import { AuthorizationRequestDTO } from '../dtos/AuthorizationRequestDTO'
import { AccountSupplierAuthorization } from '../infra/typeorm/entities/AccountSupplierAuthorization'
import { AccountsMapper } from './AccountsMapper'

class AuthorizationRequestMapper {
  static toDTO(
    authorization: AccountSupplierAuthorization
  ): AuthorizationRequestDTO {
    const authorizationDTO = {
      id: authorization.id,
      account: AccountsMapper.toDTO(authorization.account),
      supplier: AccountsMapper.toDTO(authorization.supplier),
      authorized: authorization.authorized,
      created_at: authorization.created_at,
      updated_at: authorization.updated_at,
    } as AuthorizationRequestDTO

    return authorizationDTO
  }
}

export { AuthorizationRequestMapper }
