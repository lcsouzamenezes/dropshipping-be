import { create } from 'domain';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from './CreateUserService';

interface IRequest {
  email: string;
  password: string;
  account_id: string;
}

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);
    const { email, password, account_id } = request.body as IRequest;
    const user = await createUserService.execute({
      email,
      password,
      account_id,
    });
    return response.json(user);
  }
}

export { CreateUserController };
