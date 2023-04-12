import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { env } from '../env'

const { JWT_SECRET } = env

export async function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const token = request.cookies.token

  if (!token) {
    return reply.status(401).send({
      error: 'Unauthorized.',
    })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return reply.status(401).send({
        error: 'Unauthorized.',
      })
    }

    const { id } = decoded as { id: string }

    request.user_id = id
  })
}
