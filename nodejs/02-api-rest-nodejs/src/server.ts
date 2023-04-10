import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const { PORT } = env

const app = fastify()

app.get('/', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return transactions
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
