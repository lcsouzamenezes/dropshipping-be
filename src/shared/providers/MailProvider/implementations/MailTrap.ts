import { IViewProvider } from '@shared/providers/ViewProvider/IViewProvider';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import { IMailProvider, IViewInterface } from '../IMailProvider';

@injectable()
class MailTrap implements IMailProvider {
  constructor(
    @inject('ViewProvider')
    private viewProvider: IViewProvider
  ) {
    this.client = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  private client: Transporter;

  async send(to: string, subject: string, view: IViewInterface) {
    const html = this.viewProvider.render(view.path, view.variables);

    this.client.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
  }
}

export { MailTrap };
