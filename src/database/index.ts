import { Env } from '@/utils/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as AuthTable from './schemas/auth'
import * as InvitationsTable from './schemas/invitations'
import * as ProjectTable from './schemas/projects'
import * as UsersTable from './schemas/users'

const connectionString = Env.DATABASE_URL
const schema = {
    ...UsersTable,
    ...ProjectTable,
    ...AuthTable,
    ...InvitationsTable,
}

const client = postgres(connectionString)
export const db = drizzle(client, { logger: true, schema })
