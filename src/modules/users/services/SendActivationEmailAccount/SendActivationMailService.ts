import { User } from '@modules/users/infra/typeorm/entities/User';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { resolve } from 'path';
import { autoInjectable, inject } from 'tsyringe';
import crypto from 'crypto';

@autoInjectable()
class SendActivationMailService {
  constructor(@inject('MailProvider') private mailProvider: IMailProvider) {}

  async execute(user: User): Promise<void> {
    const appName = process.env.APP_NAME;

    const token = crypto.randomBytes(36).toString('hex');

    await this.mailProvider.send(user.email, `Ativação de conta - ${appName}`, {
      path: resolve(__dirname, '..', '..', 'views', 'emails', 'activation.hbs'),
      variables: {
        appName,
        activationLink: `${process.env.CLIENT_HOST}/ativacao-de-usuário?token=${token}&id=${user.id}`,
      },
    });
  }
}

export { SendActivationMailService };
