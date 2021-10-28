import { Job } from '@shared/libs/Queue'
import { container } from 'tsyringe'
import { Account } from '../infra/typeorm/entities/Account'
import { SendActivationMailService } from '../services/SendActivationEmailAccount/SendActivationMailService'

interface SendAccountActivationEmailData {
  data: {
    account: Account
    redirectUrl?: string
  }
}

export default {
  name: 'SendAccountActivationEmail',
  async handle({ data }: SendAccountActivationEmailData) {
    const sendAccountActivationEmail = container.resolve(
      SendActivationMailService
    )

    await sendAccountActivationEmail.execute(data.account, data.redirectUrl)
  },
} as Job
