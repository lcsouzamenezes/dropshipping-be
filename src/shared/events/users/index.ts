import { User } from '@modules/users/infra/typeorm/entities/User';
import { CreateUserListener } from '@modules/users/listeners/CreateUserListener';
import { EventProvider } from '@shared/providers/EventProvider/EventProvider';
import { container } from 'tsyringe';

const events = container.resolve(EventProvider);
const createUserListener = new CreateUserListener();

events.on('user-created', createUserListener.handle);
