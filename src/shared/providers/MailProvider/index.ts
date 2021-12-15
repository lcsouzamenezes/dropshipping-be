import { container } from 'tsyringe'
import { IMailProvider } from './IMailProvider'
import { MailTrap } from './implementations/MailTrap'
import { SMTP } from './implementations/SMTP'

const mailProviders = {
  mailtrap: MailTrap,
  smtp: SMTP,
}

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProviders[process.env.MAIL_DRIVER ?? 'mailtrap']
)
