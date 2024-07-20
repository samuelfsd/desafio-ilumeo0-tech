import { hash } from 'bcryptjs'
import type { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { UserCodeAlreadyExists } from '@/use-cases/errors/user-code-already-exists'

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
  code: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  // SOLID -> D - Dependency Inversion Principle  -> aplicar inversão de dependência
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    code
  }: registerUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    const userWithSameCode = await this.usersRepository.findByCode(code)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    if (userWithSameCode) {
      throw new UserCodeAlreadyExists()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      code
    })

    return {
      user
    }
  }
}
