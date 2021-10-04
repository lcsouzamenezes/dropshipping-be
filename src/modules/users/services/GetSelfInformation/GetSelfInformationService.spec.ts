import { UsersRepository } from '@modules/users/repositories/in-memory/UsersRepository'
import { GetSelfInformationService } from '@modules/users/services/GetSelfInformation/GetSelfInformationService'

let usersRepository: UsersRepository
let getSelfInformationService: GetSelfInformationService

describe('GetSelfInformationService', () => {
  beforeAll(() => {
    usersRepository = new UsersRepository()
    getSelfInformationService = new GetSelfInformationService(usersRepository)
  })

  it('should be able to return user info', async () => {
    const user = await usersRepository.create({
      email: 'agwi@docuduam.lv',
      password: 'ELCBFPvZ5tDl',
      account_id: 'pU61qZNzNdNGFSr1fN8eaS4lubWy5ejD',
    })

    const userInfo = await getSelfInformationService.execute(user.id)

    expect(userInfo).toHaveProperty('email')
  })
})
