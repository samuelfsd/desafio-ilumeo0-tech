import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPointsRepository } from '@/repositories/in-memory/in-memory-points-repository'
import { GetUserPointsUseCase } from './get-user-points'
import { PointType } from '@prisma/client'

let pointsRepository: InMemoryPointsRepository
let sut: GetUserPointsUseCase

describe('Get User Points Use Case', () => {
  beforeEach(() => {
    pointsRepository = new InMemoryPointsRepository()
    sut = new GetUserPointsUseCase(pointsRepository)
  })

  it('should be able to get user points', async () => {
    const userPoints = [
      { id: 1, user_id: 1, type: PointType.ENTRY,  hour: new Date('2024-07-01T14:30:00.000Z'), date: new Date(), created_at: new Date() },
      { id: 2, user_id: 1, type: PointType.EXIT, hour:  new Date('2024-07-01T16:30:00.000Z'), date: new Date(), created_at: new Date() },
    ]

    userPoints.forEach((point) => pointsRepository.items.push(point))

    const { points } = await sut.execute({userId: 1})

    expect(points).toHaveLength(2)
    expect(points).toEqual([
      expect.objectContaining({id: 1}),
      expect.objectContaining({id: 2}),
    ])
  })
})
