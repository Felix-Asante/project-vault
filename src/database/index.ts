import { Env } from '@/utils/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as UsersTable from './schemas/users'

const connectionString = Env.DATABASE_URL
const schema = { ...UsersTable}

const client = postgres(connectionString)
export const db = drizzle(client, { logger: true, schema })
