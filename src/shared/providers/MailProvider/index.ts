import { container } from 'tsyringe';
import { IMailProvider } from './IMailProvider';
import { MailTrap } from './implementations/MailTrap';

const mailProviders = {
  mailtrap: MailTrap,
};

const trap = new mailProviders[process.env.MAIL_DRIVER]();

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProviders[process.env.MAIL_DRIVER ?? 'mailtrap']
);
