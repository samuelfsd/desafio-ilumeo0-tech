import { FastifyInstance } from 'fastify'

import { register } from '@/http/controllers/users/register'
import { authenticate } from '@/http/controllers/users/authenticate'
import { getProfile } from '@/http/controllers/users/get-profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/users/authenticate', authenticate)
  app.get('/user', getProfile)
}
