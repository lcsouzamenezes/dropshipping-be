interface IViewInterface {
  path: string;
  variables: object;
}

interface IMailProvider {
  send(
    to: string,
    subject: string,
    view: string | IViewInterface
  ): Promise<void>;
}

export { IMailProvider, IViewInterface };
