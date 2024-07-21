import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  // usando o inMemoryTest database
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: Math.floor(Math.random() * 50) + 1,
      name:data.name ? data.name: null,
      email: data.email ? data.email: null,
      password: data.password ? data.password : null,
      created_at: new Date(),
      code: data.code
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByCode(code: string) {
    const user = this.items.find((item) => item.code === code)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: number) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
