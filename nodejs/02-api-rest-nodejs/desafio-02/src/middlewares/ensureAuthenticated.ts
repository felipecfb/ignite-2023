import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const token = request.cookies.token

  if (!token) {
    return reply.status(401).send({
      error: 'Unauthorized.',
    })
  }
}
