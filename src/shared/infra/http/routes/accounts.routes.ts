import { CreateAccountController } from '@modules/accounts/services/CreateAccount/CreateAccountController';
import { Router } from 'express';

const accountsRoutes = Router();

const createAccountController = new CreateAccountController();

accountsRoutes.post('/', createAccountController.handle);

export { accountsRoutes };
