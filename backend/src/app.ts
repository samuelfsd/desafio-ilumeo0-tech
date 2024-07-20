import fastify from 'fastify'

import { appRoutes } from '@/http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler(() => (error: any, _: any, reply: any) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Erro de validação.', errorMessages: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    //@TODO:  log para uma ferramenta externa -> dataDog / newRelic / Sentry
  }

  return reply.status(500).send({
    message: 'Ops, aconteceu algo inesperado, tente novamente mais tarde.'
  })
})
