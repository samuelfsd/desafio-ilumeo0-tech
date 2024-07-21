import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { UserCodeAlreadyExists } from '@/use-cases/errors/user-code-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    code: z.string().min(4)
  })

  const { name, email, password, code } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password, code })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ statusCode: 409, message: error.message })
    }

    if (error instanceof UserCodeAlreadyExists) {
      return reply.status(409).send({ statusCode: 409, message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
