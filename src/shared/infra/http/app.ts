import express from 'express';
import createConnection from '@shared/infra/typeorm';
import { routes } from './routes';

import '@shared/container';

createConnection();

const app = express();

app.use(express.json());
app.use(routes);

export { app };
