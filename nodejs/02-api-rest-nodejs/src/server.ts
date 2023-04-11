import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const { PORT } = env

const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request, reply) => {
  console.log(`[${request.method}] ${request.url}`)
})

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.get('/hello', () => {
  return 'Hello world'
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
