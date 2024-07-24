import { FastifyRequest, FastifyReply } from 'fastify'
import { PointType } from '@prisma/client'
import { z } from 'zod'

import { makePointUseCase } from '@/use-cases/factories/make-point-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPointParamsSchema = z.object({
    userId: z.string().refine((val) => !isNaN(Number(val)), {
      message: "userId must be a number",
    }).transform((val) => Number(val)),
  });

  const createPointBodySchema = z.object({
    type: z.nativeEnum(PointType),
  })

  try {
    const pointUseCase = makePointUseCase()

    const { userId } = createPointParamsSchema.parse(request.params)
    const { type } = createPointBodySchema.parse(request.body)

    const { point } =  await pointUseCase.execute({ userId, type })
    return reply.status(201).send({ point })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ statusCode: 404, message: error.message })
    }
    throw error
  }
}
