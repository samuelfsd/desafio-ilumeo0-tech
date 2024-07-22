import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserCodeInvalid } from '@/use-cases/errors/user-code-invalid-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    code: z.string().min(4)
  })

  const { code } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({ code })
  } catch (error) {
    if (error instanceof UserCodeInvalid) {
      return reply.status(400).send({ statusCode: 400, message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
