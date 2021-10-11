interface ICreateAccountDTO {
  company: string
  name: string
  active?: boolean
  type?: 'seller' | 'supplier'
  email: string
  password: string
  redirectUrl?: string
}

export { ICreateAccountDTO }
