import type { FastifyInstance } from 'fastify'
import { petRegister } from '../controllers/petRegister'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', petRegister)
}
