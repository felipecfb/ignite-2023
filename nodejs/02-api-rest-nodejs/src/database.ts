import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

const { DATABASE_URL, DATABASE_CLIENT } = env

export const config: Knex.Config = {
  client: 'sqlite',
  connection:
    DATABASE_CLIENT === 'sqlite'
      ? {
          filename: DATABASE_URL,
        }
      : DATABASE_CLIENT,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
