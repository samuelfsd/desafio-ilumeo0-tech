import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { UserCodeInvalid } from './errors/user-code-invalid-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: await hash('123456', 6),
      code: '#1ABCDEJ10'
    })

    const { user } = await sut.execute({
      code: '#1ABCDEJ10'
    })

    expect(user.code).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong code', async () => {
    await expect(() =>
      sut.execute({
        code: '#1ABCDEJ10'
      })
    ).rejects.toBeInstanceOf(UserCodeInvalid)
  })
})
