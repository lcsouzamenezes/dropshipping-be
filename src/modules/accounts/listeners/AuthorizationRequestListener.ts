import Queue from '@shared/libs/Queue'
import { Account } from '../infra/typeorm/entities/Account'
import { AccountSupplierAuthorization } from '../infra/typeorm/entities/AccountSupplierAuthorization'

interface AuthotizationRequestListenerData {
  authorization: AccountSupplierAuthorization
  requester: Account
  supplier: Account
}

class AuthotizationRequestListener {
  async handle({
    authorization,
    requester,
    supplier,
  }: AuthotizationRequestListenerData) {
    Queue.add(
      'SendNewAuthorizationRequestEmail',
      {
        authorization,
        requester,
        supplier,
      },
      {
        attempts: 10,
      }
    )
  }
}

export { AuthotizationRequestListener }
