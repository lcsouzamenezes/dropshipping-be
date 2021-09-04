import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAccountService } from './CreateAccountService';

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, type, email, password } = request.body;
    const createAccountService = container.resolve(CreateAccountService);
    const account = await createAccountService.execute({
      name,
      type,
      email,
      password,
    });

    return response.status(201).json(account);
  }
}

export { CreateAccountController };
