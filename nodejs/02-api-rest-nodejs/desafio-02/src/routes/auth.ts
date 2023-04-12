import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { comparePassword } from '../utils/bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../env'

const { JWT_SECRET } = env

export async function authRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const getUserParamsSchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = getUserParamsSchema.parse(request.body)

    const user = await knex('users').where('email', email).first()

    if (!user) {
      return reply.status(400).send({
        error: 'Email or password invalid.',
      })
    }

    const compare = await comparePassword(password, user.password)

    if (!compare) {
      return reply.status(400).send({
        error: 'Email or password invalid.',
      })
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    })

    reply.cookie('token', token, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    return reply.status(200).send()
  })
}
