import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider'
import { resolve } from 'path'
import { autoInjectable, inject } from 'tsyringe'
import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { AccountSupplierAuthorization } from '@modules/accounts/infra/typeorm/entities/AccountSupplierAuthorization'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

interface ExecuteDate {
  authorization?: AccountSupplierAuthorization
  requester?: Account
  supplier: Account
}

@autoInjectable()
class SendAuthorizationRequestEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ supplier }: ExecuteDate): Promise<void> {
    const appName = process.env.APP_NAME

    const user = await this.usersRepository.getOldest(supplier.id)

    await this.mailProvider.send(
      user.email,
      `Nova solicitação de acesso - ${appName}`,
      {
        path: resolve(
          __dirname,
          '..',
          '..',
          'views',
          'notifications',
          'authorizationRequest.hbs'
        ),
        variables: {
          appName,
          account: supplier,
          requestLink: `${process.env.CLIENT_HOST}/sellers`,
        },
      }
    )
  }
}

export { SendAuthorizationRequestEmailService }
