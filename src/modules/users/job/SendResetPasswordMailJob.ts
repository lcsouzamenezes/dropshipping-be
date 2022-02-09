import { Job } from '@shared/libs/Queue'
import { container } from 'tsyringe'
import { User } from '../infra/typeorm/entities/User'
import { ResetPasswordMailService } from '../services/ResetPasswordMailService/ResetPasswordMailService'

export interface HandleData {
  user: User
  redirectUrl?: string
}

export default {
  name: 'SendResetPasswordEmail',
  async handle({ data }: { data: HandleData }) {
    const resetPasswordMailService = container.resolve(ResetPasswordMailService)
    await resetPasswordMailService.execute(data.user, data.redirectUrl)
  },
} as Job
