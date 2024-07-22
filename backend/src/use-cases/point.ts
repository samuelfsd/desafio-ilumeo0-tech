import { Point, PointType } from '@prisma/client'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { PointsRepository } from '@/repositories/points-repository'
interface PointUseCaseRequest {
  userId: number
  type: PointType
}

interface PointUseCaseResponse {
  point: Point
}

export class PointUseCase {
  constructor(private pointsRepository: PointsRepository) {}

  async execute({
    userId,
    type
  }: PointUseCaseRequest): Promise<PointUseCaseResponse> {
    await this.validateThereIsNoEntryPoint(userId, type);

    const existsPoint = await this.pointsRepository.findByUserIdAndType(userId, type)

    if (existsPoint) {
      throw new Error()
    }

    const point = await this.pointsRepository.create({
      date: new Date(),
      hour: new Date(new Date().setHours(new Date().getHours())),
      user_id: userId,
      type,
    })

    if (!point) {
      throw new ResourceNotFoundError()
    }

    return {
      point
    }
  }

  private async validateThereIsNoEntryPoint(userId: number, type: PointType): Promise<void> {
    if (type === PointType.EXIT) {
      const existsPoint = await this.pointsRepository.findByUserIdAndType(userId, PointType.ENTRY);
      if (!existsPoint) {
        throw new Error();
      }
    }
  }
}
