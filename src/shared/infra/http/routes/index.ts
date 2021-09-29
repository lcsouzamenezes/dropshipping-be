import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { accountsRoutes } from './accounts.routes';
import { sessionsRoutes } from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/accounts', accountsRoutes);
routes.use('/users', usersRoutes);

export { routes };
