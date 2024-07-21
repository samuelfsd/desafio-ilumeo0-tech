import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryPointsRepository } from '@/repositories/in-memory/in-memory-points-repository'
import { PointUseCase } from './point'
import { PointType } from '@prisma/client'

let usersRepository: InMemoryPointsRepository
let sut: PointUseCase

describe('Point Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryPointsRepository()
    sut = new PointUseCase(usersRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create point', async () => {
    const { point } = await sut.execute({
      userId: 1,
      type: PointType.ENTRY
    })

    expect(point.id).toEqual(expect.any(Number))
  })

  it('should not be able to create an entry point if one already exists', async () => {
    vi.setSystemTime(new Date(2024, 2, 10, 10, 0 , 0))

    await sut.execute({
      userId: 1,
      type: PointType.ENTRY
    })

    await expect(() => sut.execute({
      userId: 1,
      type: PointType.ENTRY
    }),
  ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to create an exit point if no entry point exists', async () => {
    await expect(() => sut.execute({
      userId: 1,
      type: PointType.EXIT
    }),
  ).rejects.toBeInstanceOf(Error)
  })

})
