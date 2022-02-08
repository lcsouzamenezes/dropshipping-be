import crypto from 'crypto'
import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'

import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider'

@injectable()
class ResetPasswordService {
  constructor(
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(user: User, redirectUrl?: string): Promise<void> {
    const appName = process.env.APP_NAME

    const token = crypto.randomBytes(36).toString('hex')

    await this.userTokensRepository.create({
      token,
      user_id: user.id,
      type: 'activation_token',
      expires_at: this.dateProvider.addMinutes(15),
    })

    await this.mailProvider.send(
      user.email,
      `Recuperação de senha - ${appName}`,
      {
        path: resolve(
          __dirname,
          '..',
          '..',
          'views',
          'emails',
          'passwordReset.hbs'
        ),
        variables: {
          appName,
          user: user,
          recoveryLink: redirectUrl
            ? redirectUrl
            : `${process.env.CLIENT_HOST}/user/password-recovery?token=${token}&id=${user.id}`,
        },
      }
    )
  }
}

export { ResetPasswordService }
