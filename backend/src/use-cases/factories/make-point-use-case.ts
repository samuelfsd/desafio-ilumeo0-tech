import { PrismaPointsRepository } from '@/repositories/prisma/prisma-points-repository'
import { PointUseCase } from '@/use-cases/point'

export function makePointUseCase() {
  const pointsRepository = new PrismaPointsRepository()
  const pointsUseCase = new PointUseCase(pointsRepository)

  return pointsUseCase
}
