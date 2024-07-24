import { makeGetUserPointsUseCase } from '@/use-cases/factories/make-get-user-points-use-case';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getUserPoints(request: FastifyRequest, reply: FastifyReply) {
  const getUserPointsParamsSchema = z.object({
    userId: z.string().refine((val) => !isNaN(Number(val)), {
      message: "userId must be a number",
    }).transform((val) => Number(val)),
  });

  const { userId } = getUserPointsParamsSchema.parse(request.params)

  const pointUseCase = makeGetUserPointsUseCase()

  const points = await pointUseCase.execute({ userId })

  return reply.status(200).send(
    points
  )
}
