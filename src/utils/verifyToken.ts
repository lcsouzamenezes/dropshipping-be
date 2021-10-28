import authConfig from '@config/auth'
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { AppError } from '@shared/errors/AppError'
import { verify } from 'jsonwebtoken'

async function verifyToken(token: string): Promise<User> {
  const usersRepository = new UsersRepository()

  const { sub: user_id } = verify(token, authConfig.token_secret)

  const user = await usersRepository.findById(String(user_id))

  if (!user) {
    throw new AppError('User not found', 'auth.user.not_found', 401)
  }

  return user
}

export { verifyToken }
