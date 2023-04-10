import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

const { DATABASE_URL } = env

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
