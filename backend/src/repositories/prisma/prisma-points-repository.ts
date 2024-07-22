import { PointType, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { PointsRepository } from '@/repositories/points-repository'

export class PrismaPointsRepository implements PointsRepository {
  async create(data: Prisma.PointUncheckedCreateInput) {
    const point = await prisma.point.create({
      data
    })

    return point
  }

  async findByUserIdAndType(userId: number, type: PointType) {
    const point = await prisma.point.findFirst({
      where: {
        user_id: userId,
        type: type,
      },
    });

    return point;
  }

  async findManyByUserId(userId: number) {
    const points = await prisma.point.findMany({
      where: {
        user_id: userId
      }
    })

    return points
  }
}
