import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByCode(code: string): Promise<User | null>
  findById(id: number): Promise<User | null>
}