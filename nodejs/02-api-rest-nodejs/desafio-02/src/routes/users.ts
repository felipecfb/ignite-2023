import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { hashPassword } from '../utils/bcrypt/hashPassword'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {})

  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = createUserBodySchema.parse(request.body)

    const user = await knex('users').where({
      email,
    })

    if (user) {
      return reply.status(400).send({
        error: 'User already exists.',
      })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await knex('users').insert({
      id: randomUUID(),
      email,
      password: hashedPassword,
    })

    console.log(newUser)

    // reply.cookie('userId')

    return reply.status(201).send()
  })
}
