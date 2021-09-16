import { container } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { SendActivationMailService } from '../services/CreateUser/SendActivationMailService';

class CreateUserListener {
  async handle(user: User): Promise<void> {
    console.log('A user event was emitted');
    const sendActivationEmail = container.resolve(SendActivationMailService);
    await sendActivationEmail.execute(user);
  }
}

export { CreateUserListener };
