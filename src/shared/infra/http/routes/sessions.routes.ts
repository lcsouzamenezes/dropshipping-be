import { CreateSessionController } from '@modules/users/services/CreateSession/CreateSessionController';
import { Router } from 'express';

const sessionsRoutes = Router();
const createSessionController = new CreateSessionController();

sessionsRoutes.post('/', createSessionController.handle);

export { sessionsRoutes };
