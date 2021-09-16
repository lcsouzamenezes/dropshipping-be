import { IViewProvider } from '../IViewProvider';

class FakeViewProvider implements IViewProvider {
  render(template: string, data: any): string {
    return 'template rendered';
  }
}

export { FakeViewProvider };
