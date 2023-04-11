import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'
import { env } from '../env'

const { DATABASE_CLIENT, DATABASE_URL } = env

export const config: Knex.Config = {
  client: DATABASE_CLIENT,
  connection: DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
