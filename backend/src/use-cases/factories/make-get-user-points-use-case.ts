import { PrismaPointsRepository } from '@/repositories/prisma/prisma-points-repository'
import { GetUserPointsUseCase } from '@/use-cases/get-user-points'

export function makeGetUserPointsUseCase() {
  const pointsRepository = new PrismaPointsRepository()
  const pointsUseCase = new GetUserPointsUseCase(pointsRepository)

  return pointsUseCase
}
