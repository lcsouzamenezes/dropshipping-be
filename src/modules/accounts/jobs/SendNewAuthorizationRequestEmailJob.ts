import { Job } from '@shared/libs/Queue'
import { container } from 'tsyringe'
import { Account } from '../infra/typeorm/entities/Account'
import { AccountSupplierAuthorization } from '../infra/typeorm/entities/AccountSupplierAuthorization'
import { SendAuthorizationRequestEmailService } from '../services/SendAuthorizationRequestEmail/SendAuthorizationRequestEmailService'

interface HandleData {
  data: {
    authorization: AccountSupplierAuthorization
    requester: Account
    supplier: Account
  }
}

export default {
  name: 'SendNewAuthorizationRequestEmail',
  async handle({ data: { authorization, requester, supplier } }: HandleData) {
    const sendAuthorizationRequestEmailService = container.resolve(
      SendAuthorizationRequestEmailService
    )
    await sendAuthorizationRequestEmailService.execute({
      authorization,
      requester,
      supplier,
    })
  },
} as Job
