import { IViewProvider } from '@shared/providers/ViewProvider/IViewProvider'
import { inject, injectable } from 'tsyringe'
import { IMailProvider, IViewInterface } from '../IMailProvider'
import { MailService } from '@sendgrid/mail'

@injectable()
class SendGrid implements IMailProvider {
  client: MailService

  constructor(
    @inject('ViewProvider')
    private viewProvider: IViewProvider
  ) {
    this.client = new MailService()
    this.client.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async send(to: string, subject: string, view: IViewInterface): Promise<void> {
    const html = this.viewProvider.render(view.path, view.variables)

    try {
      await this.client.send({
        from: process.env.MAIL_FROM,
        to,
        subject,
        html,
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export { SendGrid }
