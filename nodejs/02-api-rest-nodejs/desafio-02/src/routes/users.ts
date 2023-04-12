import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { hashPassword } from '../utils/bcrypt'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const users = await knex('users').select(
      'id',
      'email',
      'created_at',
      'updated_at',
    )

    return reply.status(200).send(users)
  })

  app.get('/:id', async (request, reply) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getUserParamsSchema.parse(request.params)

    const users = await knex('users')
      .where('id', id)
      .select('id', 'email', 'created_at', 'updated_at')
      .first()

    return reply.status(200).send(users)
  })

  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = createUserBodySchema.parse(request.body)

    const user = await knex('users')
      .where({
        email,
      })
      .first()

    if (user) {
      return reply.status(400).send({
        error: 'User already exists.',
      })
    }

    const hashedPassword = await hashPassword(password)

    await knex('users').insert({
      id: randomUUID(),
      email,
      password: hashedPassword,
    })

    return reply.status(201).send()
  })

  app.delete('/:id', async (request, reply) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getUserParamsSchema.parse(request.params)

    await knex('users').where('id', id).del()

    return reply.status(201).send()
  })
}
