import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { UserCodeAlreadyExists } from './errors/user-code-already-exists'


describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: await hash('123456', 6) ,
      code: '#1ABCDEJ10'
    })

    const { user } = await sut.execute({
      code: '#1ABCDEJ10'
    })

    expect(user.code).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong code', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() => sut.execute({
        code: '#1ABCDEJ10'
      })).rejects.toBeInstanceOf(UserCodeAlreadyExists)
  })

})
