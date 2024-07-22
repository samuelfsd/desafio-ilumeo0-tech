import { Point } from '@prisma/client'

import { PointsRepository } from '@/repositories/points-repository'

interface GetUserPointsUseCaseRequest {
  userId: number
}

interface GetUserPointsUseCaseResponse {
  points: Point[]
}

export class GetUserPointsUseCase {
  constructor(private pointsRepository: PointsRepository) {}

  async execute({userId}: GetUserPointsUseCaseRequest ): Promise<GetUserPointsUseCaseResponse> {
    const points = await this.pointsRepository.findManyByUserId(userId);

    return {
      points
    }
  }
}
