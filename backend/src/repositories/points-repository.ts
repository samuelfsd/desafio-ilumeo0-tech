import { Prisma, Point } from '@prisma/client'

export interface PointsRepository {
  create(data: Prisma.PointUncheckedCreateInput): Promise<Point>
}