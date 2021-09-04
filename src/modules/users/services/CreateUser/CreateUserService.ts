import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { AppError } from '@errors/AppError';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    email,
    password,
    account_id,
  }: ICreateUserDTO): Promise<User> {
    const hashedPassword = await hash(password, 8);

    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('E-mail already taken', 409);
    }

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      account_id,
    });

    return user;
  }
}

export { CreateUserService };
