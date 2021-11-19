import { IViewProvider } from '@shared/providers/ViewProvider/IViewProvider'
import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'
import { IMailProvider, IViewInterface } from '../IMailProvider'
import mailConfig from '@config/mail'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

@injectable()
class SMTP implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('ViewProvider')
    private viewProvider: IViewProvider
  ) {
    this.client = nodemailer.createTransport(
      mailConfig as SMTPTransport.Options
    )
  }

  async send(to: string, subject: string, view: IViewInterface) {
    const html = this.viewProvider.render(view.path, view.variables)

    await this.client.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    })
  }
}

export { SMTP }
