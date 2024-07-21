import { UsersRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'

import { UserCodeAlreadyExists } from '@/use-cases/errors/user-code-already-exists-error'
import { UserCodeInvalid } from '@/use-cases/errors/user-code-invalid-error'

interface AuthenticateUseCaseRequest {
  code: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    code
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByCode(code)

    if (!user) {
      throw new UserCodeInvalid()
    }

    const hasCodeMatches = user.code === code

    if (!hasCodeMatches) {
      throw new UserCodeInvalid()
    }

    return {
      user
    }
  }
}
