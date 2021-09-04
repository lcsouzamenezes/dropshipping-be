import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create({ email, password }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
