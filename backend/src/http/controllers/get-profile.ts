import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-profile-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfileBodySchema = z.object({
    userId: z.number()
  })

  const { userId } = getUserProfileBodySchema.parse(request.body)

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    await getUserProfileUseCase.execute({ userId })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ statusCode: 404, message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
