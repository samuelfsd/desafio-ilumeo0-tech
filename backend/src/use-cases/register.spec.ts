import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { UserCodeAlreadyExists } from '@/use-cases/errors/user-code-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
      code: '#15DASFJLHX'
    })

    expect(user.id).toEqual(expect.any(Number))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
      code: '#15DASFJLHX'
    })

    const isPasswordHashed = await compare('123456', user.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const email = 'jhondoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      code: '#15DASFJLHX'
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        code: '#15DASFJLHX'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register with same code', async () => {
    const code = '#2DASFJLHX'

    await sut.execute({
      name: 'John Doe2',
      email: 'jhondoe2@example.com',
      password: '123456',
      code
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe1',
        email: 'jhondoe1@example.com',
        password: '123456',
        code
      })
    ).rejects.toBeInstanceOf(UserCodeAlreadyExists)
  })
})
