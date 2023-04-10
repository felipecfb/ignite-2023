import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const { PORT } = env

const app = fastify()

app.register(transactionsRoutes)

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
