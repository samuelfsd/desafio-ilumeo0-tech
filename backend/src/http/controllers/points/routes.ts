import { FastifyInstance } from 'fastify'

import { create } from '@/http/controllers/points/create'
import { getUserPoints } from '@/http/controllers/points/get-user-points'


export async function pointsRoutes(app: FastifyInstance) {
  app.post('/points/:userId', create)
  app.get('/points/:userId', getUserPoints)
}
