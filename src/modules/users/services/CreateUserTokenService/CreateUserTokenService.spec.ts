import { CreateUserTokenService } from './CreateUserTokenService';

let createUserTokenService: CreateUserTokenService;

describe('CreateUserTokenService', () => {
  beforeAll(() => {
    createUserTokenService = new CreateUserTokenService();
  });

  it('should create a new user token', async () => {
    const userToken = await createUserTokenService.execute();
    expect(userToken).toHaveProperty('id');
  });
});
