import { container } from 'tsyringe'
import { IMailProvider } from './IMailProvider'
import { MailTrap } from './implementations/MailTrap'
import { SMTP } from './implementations/SMTP'

const mailProviders = {
  mailtrap: MailTrap,
  smtp: SMTP,
}

const trap = new mailProviders[process.env.MAIL_DRIVER]()

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProviders[process.env.MAIL_DRIVER ?? 'mailtrap']
)
