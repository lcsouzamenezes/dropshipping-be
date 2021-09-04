import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('CreateAccountController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations({ transaction: 'all' });
  });

  afterAll(async () => {
    if (!connection) {
      connection = getConnection();
    }
    await connection.dropDatabase();
    return connection.close();
  });

  it('should be able to create a new account', async () => {
    const bodyData = {
      name: 'Rosa McDonald',
      type: 'client',
      email: 'lida@ibco.re',
      password: 'MgzzVmZqSqIl',
    };
    const responseCreateAccount = await request(app)
      .post('/accounts')
      .send(bodyData);
    expect(responseCreateAccount.status).toBe(201);
  });
});
