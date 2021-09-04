import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository';
import { UsersRepository as UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateUserService } from './CreateUserService';

let accountsRepository: AccountsRepository;
let usersRepository: UserRepositoryInMemory;

describe('CreateUserService', () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository();
    usersRepository = new UserRepositoryInMemory();
  });

  it('should be able to create a new user', async () => {
    const createUserService = new CreateUserService(usersRepository);

    const account = await accountsRepository.create({
      name: 'Cody Owen Comp.',
    });

    const user = await createUserService.execute({
      email: 'mizani@nog.sx',
      password: 'SSNLKg5aOm',
      account_id: account.id,
    });
    expect(user).toHaveProperty('id');
  });

  it('should encrypt the password', async () => {
    const createUserService = new CreateUserService(usersRepository);

    const account = await accountsRepository.create({
      name: 'Cody Owen Comp.',
    });

    const notHashedPassword = 'wbXbdlonb1lE';

    const user = await createUserService.execute({
      email: 'ejeuctan@egzunadu.ht',
      password: notHashedPassword,
      account_id: account.id,
    });
    expect(user.password).not.toEqual(notHashedPassword);
  });

  it('should creaate a user with inactive status', async () => {
    const createUserService = new CreateUserService(usersRepository);

    const account = await accountsRepository.create({
      name: 'Brent Hart Comp.',
    });

    const user = await createUserService.execute({
      email: 'ba@ma.vi',
      password: 'KUMXW5hy8yNN',
      account_id: account.id,
    });
    expect(user.active).toBeFalsy();
  });

  it('should not be able to create a user with existing email', async () => {
    const createUserService = new CreateUserService(usersRepository);

    const account = await accountsRepository.create({
      name: 'Brent Hart Comp.',
    });

    const user_data = {
      email: 'ba@ma.vi',
      password: 'KUMXW5hy8yNN',
      account_id: account.id,
    };

    const user = await createUserService.execute(user_data);

    const tryAgain = async () => {
      await createUserService.execute({ ...user_data });
    };

    expect(tryAgain).rejects.toThrow(new AppError('E-mail already taken'));
  });
});
