import { User } from '@modules/users/infra/typeorm/entities/User';
import { FakeMailProvider } from '@shared/providers/MailProvider/fakes/FakeMailProvider';
import { FakeViewProvider } from '@shared/providers/ViewProvider/fakes/FakeViewProvider';
import { SendActivationMailService } from './SendActivationMailService';

let sendActivationMailService: SendActivationMailService;
let viewProvider: FakeViewProvider;
let mailProvider: FakeMailProvider;

describe('SendActivationMailService', () => {
  beforeAll(() => {
    viewProvider = new FakeViewProvider();
    mailProvider = new FakeMailProvider(viewProvider);
    sendActivationMailService = new SendActivationMailService(mailProvider);
  });

  it('should be able to send a email', async () => {
    const spyOnMailProviderSend = jest.spyOn(mailProvider, 'send');

    const user = new User();

    Object.assign(user, {
      email: 'awipwe@tu.nu',
      password: '78GbS8r5CN3X',
      active: false,
      master: false,
    });

    await sendActivationMailService.execute(user);

    expect(spyOnMailProviderSend).toBeCalledTimes(1);
  });
});
