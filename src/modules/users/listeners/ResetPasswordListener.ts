import Queue from '@libs/Queue'
import { User } from '../infra/typeorm/entities/User'

interface ResetPassworodListenerData {
  user: User
  redirectUrl?: string
}

class ResetPassworodListener {
  async handle({
    user,
    redirectUrl,
  }: ResetPassworodListenerData): Promise<void> {
    Queue.add(
      'SendResetPasswordEmail',
      {
        user,
        redirectUrl,
      },
      {
        attempts: 10,
      }
    )
  }
}

export { ResetPassworodListener }
