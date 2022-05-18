interface ICreateComboLisgingDTO {
  code: string
  account_id: string
  integration_id: string
  products_id: string[]
  active?: boolean
  parent_code?: string
}

export { ICreateComboLisgingDTO }
