interface ICreateLisgingDTO {
  code: string
  account_id: string
  integration_id: string
  product_id: string
  active?: boolean
  parent_code?: string
}

export { ICreateLisgingDTO }
