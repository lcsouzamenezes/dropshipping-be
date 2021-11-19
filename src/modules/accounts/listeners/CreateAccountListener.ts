import { container } from 'tsyringe'
import { Account } from '../infra/typeorm/entities/Account'
import { SendActivationMailService } from '../services/SendActivationEmailAccount/SendActivationMailService'
import Queue from '@libs/Queue'

interface CreateAccountListenerData {
  account: Account
  redirectUrl?: string
}

class CreateAccountListener {
  async handle({
    account,
    redirectUrl,
  }: CreateAccountListenerData): Promise<void> {
    // const sendActivationEmail = container.resolve(SendActivationMailService)
    // await sendActivationEmail.execute(account, redirectUrl)
    Queue.add(
      'SendAccountActivationEmail',
      {
        account,
        redirectUrl,
      },
      {
        attempts: 10,
      }
    )
  }
}

export { CreateAccountListener }
