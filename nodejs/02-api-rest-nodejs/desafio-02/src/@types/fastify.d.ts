// eslint-disable-next-line
import { Fastify } from 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user_id: string
  }
}
