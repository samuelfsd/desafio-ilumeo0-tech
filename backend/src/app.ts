import fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'

import { pointsRoutes } from '@/http/controllers/points/routes'
import { usersRoutes } from '@/http/controllers/users/routes'

export const app = fastify()

app.register(cors, {
  origin: ['http://localhost:5173', 'http://127.0.0.1:8080', 'http://localhost:3000'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
})


app.register(usersRoutes)
app.register(pointsRoutes)

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
