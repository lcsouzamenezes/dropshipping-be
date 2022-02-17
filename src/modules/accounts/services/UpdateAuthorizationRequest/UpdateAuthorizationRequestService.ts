import { IAccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizationsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateAuthorizationRequestService {
  constructor(
    @inject('AccountsSuppliersAuthorizationsRepository')
    private accountsSuppliersAuthorizationsRepository: IAccountsSuppliersAuthorizationsRepository
  ) {}

  async execute(authorization_id: string, authorize: boolean) {
    const authorization =
      await this.accountsSuppliersAuthorizationsRepository.updateAuthorized(
        authorization_id,
        authorize
      )
    return authorization
  }
}

export { UpdateAuthorizationRequestService }
