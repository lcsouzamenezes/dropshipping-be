interface ICreateAccountDTO {
  name: string;
  active?: boolean;
  type?: 'client' | 'supplier';
  email: string;
  password: string;
}

export { ICreateAccountDTO };
