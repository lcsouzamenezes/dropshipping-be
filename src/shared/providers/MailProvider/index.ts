import { container } from 'tsyringe';
import { IMailProvider } from './IMailProvider';
import { MailTrap } from './implementations/MailTrap';

const mailProviders = {
  mailtrap: MailTrap,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProviders[process.env.MAIL_DRIVER ?? 'mailtrap']
);
