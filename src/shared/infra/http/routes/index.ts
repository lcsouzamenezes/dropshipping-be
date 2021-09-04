import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { accountsRoutes } from './accounts.routes';

const routes = Router();

routes.use('/accounts', accountsRoutes);
routes.use('/users', usersRoutes);

export { routes };
