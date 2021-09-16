import { User } from '@modules/users/infra/typeorm/entities/User';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { resolve } from 'path';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
class SendActivationMailService {
  constructor(@inject('MailProvider') private mailProvider: IMailProvider) {}

  async execute(user: User): Promise<void> {
    const appName = process.env.APP_NAME;

    await this.mailProvider.send(user.email, `Ativação de conta - ${appName}`, {
      path: resolve(__dirname, '..', '..', 'views', 'emails', 'activation.hbs'),
      variables: {
        appName,
      },
    });
  }
}

export { SendActivationMailService };
