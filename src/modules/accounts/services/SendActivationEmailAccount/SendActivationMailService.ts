import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider'
import { resolve } from 'path'
import { autoInjectable, inject } from 'tsyringe'
import crypto from 'crypto'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'
import { Account } from '@modules/accounts/infra/typeorm/entities/Account'

@autoInjectable()
class SendActivationMailService {
  constructor(
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(account: Account, redirectUrl?: string): Promise<void> {
    const appName = process.env.APP_NAME

    const token = crypto.randomBytes(36).toString('hex')

    await this.userTokensRepository.create({
      token,
      user_id: account.user.id,
      type: 'activation_token',
      expires_at: this.dateProvider.addMinutes(15),
    })

    await this.mailProvider.send(
      account.user.email,
      `Ativação de conta - ${appName}`,
      {
        path: resolve(
          __dirname,
          '..',
          '..',
          'views',
          'emails',
          'activation.hbs'
        ),
        variables: {
          appName,
          user: account.user,
          activationLink: redirectUrl
            ? redirectUrl
            : `${process.env.CLIENT_HOST}/account/activation?token=${token}&id=${account.user.id}`,
        },
      }
    )
  }
}

export { SendActivationMailService }
