import { container } from 'tsyringe'
import { IMailProvider } from './IMailProvider'
import { MailTrap } from './implementations/MailTrap'
import { SendGrid } from './implementations/SendGrid'
import { SMTP } from './implementations/SMTP'

const mailProviders = {
  mailtrap: MailTrap,
  smtp: SMTP,
  sendgrid: SendGrid,
}

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProviders[process.env.MAIL_DRIVER ?? 'mailtrap']
)
