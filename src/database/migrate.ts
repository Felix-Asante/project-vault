import { Env } from '@/utils/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const migrationClient = postgres(Env.DATABASE_URL as string, { max: 1 })
const db = drizzle(migrationClient)

async function startMigration() {
    await migrate(db, { migrationsFolder: 'src/database/migrations' })
    await migrationClient.end()
}

startMigration()
