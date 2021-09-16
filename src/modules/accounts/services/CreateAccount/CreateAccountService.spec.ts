import { AccountsRepository } from '@modules/accounts/repositories/in-memory/AccountsRepository';
import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository';
import { CreateUserService } from '@modules/users/services/CreateUser/CreateUserService';
import { CreateAccountService } from './CreateAccountService';

let accountsRepository: AccountsRepository;
let usersRepository: UsersRepository;
let createUserService: CreateUserService;

describe('CreateAccountService', () => {
  beforeAll(() => {
    accountsRepository = new AccountsRepository();
  });

  beforeEach(() => {
    usersRepository = new UsersRepository();
    createUserService = new CreateUserService(usersRepository);
  });

  it('Should be able to create a new account', async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      createUserService
    );
    const account = await createAccountService.execute({
      name: 'Elnora Harmon',
      email: 'uwoubik@susvacbo.mw',
      password: 'XzC8Jemdjiwk',
      type: 'client',
    });
    expect(account).toHaveProperty('id');
  });

  it('Should be active the new account when created', async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      createUserService
    );
    const account = await createAccountService.execute({
      name: 'Elnora Harmon',
      email: 'uwoubik@susvacbo.mw',
      password: 'XzC8Jemdjiwk',
      type: 'client',
    });
    expect(account.active).toBeTruthy();
  });

  it('Should create a new account as a client by default', async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      createUserService
    );
    const account = await createAccountService.execute({
      name: 'Elnora Harmon',
      email: 'uwoubik@susvacbo.mw',
      password: 'XzC8Jemdjiwk',
    });
    expect(account.type).toBe('client');
  });

  it('Should be able to create a new account as a client', async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      createUserService
    );
    const account = await createAccountService.execute({
      name: 'Elnora Harmon',
      email: 'uwoubik@susvacbo.mw',
      password: 'XzC8Jemdjiwk',
      type: 'client',
    });
    expect(account.type).toBe('client');
  });

  it('Should be able to create a new account as a supplier', async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      createUserService
    );
    const account = await createAccountService.execute({
      name: 'Elnora Harmon',
      email: 'uwoubik@susvacbo.mw',
      password: 'XzC8Jemdjiwk',
      type: 'supplier',
    });
    expect(account.type).toBe('supplier');
  });
});
