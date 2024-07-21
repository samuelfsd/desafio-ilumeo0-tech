import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryPointsRepository } from '@/repositories/in-memory/in-memory-points-repository'
import { PointUseCase } from './point'

let usersRepository: InMemoryPointsRepository
let sut: PointUseCase

describe('Point Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryPointsRepository()
    sut = new PointUseCase(usersRepository)
  })

  it('should be able to create point', async () => {
    const { point } = await sut.execute({
      userId: 1
    })

    expect(point.id).toEqual(expect.any(Number))
  })

})
