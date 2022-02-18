import { AccountDTO } from './AccountDTO'

interface AuthorizationRequestDTO {
  id: string
  account: AccountDTO
  supplier: AccountDTO
  authorized: boolean
  created_at: Date
  updated_at: Date
}

export { AuthorizationRequestDTO }
