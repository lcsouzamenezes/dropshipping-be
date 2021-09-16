import { EventEmitter } from 'events';
import { singleton } from 'tsyringe';

@singleton()
class EventProvider extends EventEmitter {}

export { EventProvider };
