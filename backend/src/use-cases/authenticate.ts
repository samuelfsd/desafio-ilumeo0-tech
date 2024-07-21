import { UsersRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'

import { UserCodeAlreadyExists } from '@/use-cases/errors/user-code-already-exists'

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
      throw new UserCodeAlreadyExists()
    }

    const hasCodeMatches = user.code === code
    console.log('hasCode', hasCodeMatches)

    if (!hasCodeMatches) {
      throw new UserCodeAlreadyExists()
    }

    return {
      user,
    }
  }
}
