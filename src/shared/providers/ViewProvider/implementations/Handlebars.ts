import fs from 'fs';
import handlebars from 'handlebars';
import { IViewProvider } from '../IViewProvider';

class Handlebars implements IViewProvider {
  render(template: string, data: any): string {
    const fileContent = fs.readFileSync(template, 'utf8');
    const parsedTemplate = handlebars.compile(fileContent);
    return parsedTemplate(data);
  }
}

export { Handlebars };
