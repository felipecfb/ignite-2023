import fastify from 'fastify'
import { usersRoutes } from './routes/users'
import cookie from '@fastify/cookie'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cookie)

app.register(usersRoutes, {
  prefix: 'users',
})

app.register(authRoutes, {
  prefix: 'auth',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
