import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { UserCodeAlreadyExists } from '@/use-cases/errors/user-code-already-exists'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
      code: '#15DASFJLHX'
    })

    expect(user.id).toEqual(expect.any(Number))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
      code: '#15DASFJLHX'
    })

    const isPasswordHashed = await compare('123456', user.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'jhondoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
      code: '#15DASFJLHX'
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
        code: '#15DASFJLHX'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register with same code', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const code = '#2DASFJLHX'

    await registerUseCase.execute({
      name: 'John Doe2',
      email: 'jhondoe2@example.com',
      password: '123456',
      code
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe1',
        email: 'jhondoe1@example.com',
        password: '123456',
        code
      })
    ).rejects.toBeInstanceOf(UserCodeAlreadyExists)
  })
})
