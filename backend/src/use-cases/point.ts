import { Point } from '@prisma/client'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PointsRepository } from '@/repositories/points-repository'

interface PointUseCaseRequest {
  userId: number
}

interface PointUseCaseResponse {
  point: Point
}

export class PointUseCase {
  constructor(private pointsRepository: PointsRepository) {}

  async execute({
    userId
  }: PointUseCaseRequest): Promise<PointUseCaseResponse> {
    const point = await this.pointsRepository.create({
      date: new Date(),
      hour: new Date(new Date().setHours(new Date().getHours())),
      user_id: userId
    })

    if (!point) {
      throw new ResourceNotFoundError()
    }

    return {
      point
    }
  }
}
