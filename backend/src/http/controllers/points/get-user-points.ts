import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getUserPoints(request: FastifyRequest, reply: FastifyReply) {
  const getUserPointsParamsSchema = z.object({
    userId: z.number(),
  })

  const { userId } = getUserPointsParamsSchema.parse(request.params)

  const pointUseCase = makeGetUserProfileUseCase()

  const points = await pointUseCase.execute({ userId })

  return reply.status(200).send({
    points
  })
}
