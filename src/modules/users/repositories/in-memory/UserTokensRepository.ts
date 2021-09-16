import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';
import { IUserTokensRepository } from '../IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
  private tokens: UserToken[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, data);
    this.tokens.push(userToken);
    return userToken;
  }
}

export { UserTokensRepository };
