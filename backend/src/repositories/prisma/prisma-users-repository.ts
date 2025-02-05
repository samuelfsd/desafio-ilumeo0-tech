import { Prisma, User } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async findByCode(code: string) {
    const user = await prisma.user.findUnique({
      where: {
        code
      }
    })

    return user
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }
}
