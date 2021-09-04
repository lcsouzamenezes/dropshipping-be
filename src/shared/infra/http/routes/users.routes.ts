import { CreateUserController } from '@modules/users/services/CreateUser/CreateUserController';
import { Router } from 'express';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.get('/', createUserController.handle);

export { usersRoutes };
