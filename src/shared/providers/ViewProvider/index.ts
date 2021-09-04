import { container } from 'tsyringe';
import { Handlebars } from './implementations/Handlebars';
import { IViewProvider } from './IViewProvider';

container.registerSingleton<IViewProvider>('ViewProvider', Handlebars);
