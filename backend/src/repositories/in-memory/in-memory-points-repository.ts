import { Point, PointType, Prisma } from '@prisma/client'
import { PointsRepository } from '../points-repository'

export class InMemoryPointsRepository implements PointsRepository {
  public items: Point[] = []

  async create(data: Prisma.PointUncheckedCreateInput) {
    const point = {
      id: Math.floor(Math.random() * 50) + 1,
      date: new Date(),
      type: data.type ? PointType.ENTRY : null,
      hour: new Date(new Date().setHours(new Date().getHours())),
      created_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(point)

    return point
  }

  async findByUserIdAndType(userId: number, type: PointType) {
    const point = this.items.find((item) => item.user_id === userId)
    const pointWithTypeEntry = point?.type === type

    if(pointWithTypeEntry) {
      throw new Error()
    }

    if(!point) {
      return null
    }

    this.items.push(point)
    return point
  }
}
