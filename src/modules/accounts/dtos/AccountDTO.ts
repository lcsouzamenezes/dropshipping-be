import { AddressDTO } from '@modules/addresses/mappers/AddressMapper'

interface AccountDTO {
  id: string
  name: string
  type: string
  address?: AddressDTO
}

export { AccountDTO }
