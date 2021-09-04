import handlebars from 'handlebars';
import { IViewProvider } from '../IViewProvider';

class Handlebars implements IViewProvider {
  render(template: string, data: any): string {
    const parsedTemplate = handlebars.compile(template);
    return parsedTemplate(data);
  }
}

export { Handlebars };
