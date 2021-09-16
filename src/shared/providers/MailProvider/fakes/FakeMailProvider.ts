import { IViewProvider } from '@shared/providers/ViewProvider/IViewProvider';
import { inject, injectable } from 'tsyringe';
import { IMailProvider, IViewInterface } from '../IMailProvider';

interface MailInterface {
  to: string;
  subject: string;
  view: string;
}

@injectable()
class FakeMailProvider implements IMailProvider {
  private mails: MailInterface[] = [];

  constructor(
    @inject('ViewProvider')
    private viewProvider: IViewProvider
  ) {}

  async send(to: string, subject: string, view: IViewInterface): Promise<void> {
    const renderedView = this.viewProvider.render(view.path, view.variables);

    this.mails.push({
      to,
      subject,
      view: renderedView,
    });
  }
}

export { FakeMailProvider };
