import { Job } from '@shared/libs/Queue'
import { container } from 'tsyringe'
import { Account } from '../infra/typeorm/entities/Account'
import { SendActivationMailService } from '../services/SendActivationEmailAccount/SendActivationMailService'

export interface HandleData {
  account: Account
  redirectUrl?: string
}

export default {
  name: 'SendAccountActivationEmail',
  async handle({ data }: { data: HandleData }) {
    const sendAccountActivationEmail = container.resolve(
      SendActivationMailService
    )

    await sendAccountActivationEmail.execute(data.account, data.redirectUrl)
  },
} as Job
