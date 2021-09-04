interface IViewProvider {
  render(template: string, data: any): string;
}

export { IViewProvider };
