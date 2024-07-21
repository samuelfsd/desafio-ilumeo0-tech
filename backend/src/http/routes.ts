import { FastifyInstance } from 'fastify'

import { register } from '@/http/controllers/register'
import { authenticate } from '@/http/controllers/authenticate'
import { getProfile } from '@/http/controllers/get-profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/users/authenticate', authenticate)
  app.get('/user', getProfile)
}
