/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [ensureAuthenticated] }, (request, reply) => {
    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      date_and_hour: z.string(),
      on_diet: z.boolean(),
    })

    const { user_id } = request

    const { name, description, date_and_hour, on_diet } =
      createMealSchema.parse(request.body)

    const dateFormatted = new Date(date_and_hour)

    const newMeal = knex('meals').insert({
      user_id,
      name,
      description,
      date_and_hour: dateFormatted,
      on_diet,
    })

    return reply.status(200).send(newMeal)
  })
}
