import { User } from '@modules/users/infra/typeorm/entities/User'
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider'
import { resolve } from 'path'
import { autoInjectable, inject } from 'tsyringe'
import crypto from 'crypto'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'

@autoInjectable()
class SendActivationMailService {
  constructor(
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('IUserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('IDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(user: User): Promise<void> {
    const appName = process.env.APP_NAME

    const token = crypto.randomBytes(36).toString('hex')

    await this.userTokensRepository.create({
      token,
      user_id: user.id,
      type: 'activation_token',
      expires_at: this.dateProvider.addMinutes(15),
    })

    await this.mailProvider.send(user.email, `Ativação de conta - ${appName}`, {
      path: resolve(__dirname, '..', '..', 'views', 'emails', 'activation.hbs'),
      variables: {
        appName,
        activationLink: `${process.env.CLIENT_HOST}/ativacao-de-usuário?token=${token}&id=${user.id}`,
      },
    })
  }
}

export { SendActivationMailService }
