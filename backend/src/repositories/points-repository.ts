import { Prisma, Point, PointType } from '@prisma/client'

export interface PointsRepository {
  create(data: Prisma.PointUncheckedCreateInput): Promise<Point>
  findByUserIdAndType(userId: number, type: PointType): Promise<Point | null>
}