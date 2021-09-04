import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({ email, password, account_id }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { email, password, account_id });
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  W;
}
export { UsersRepository };
