import { Env } from '@/utils/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/database/schemas/*',
    out: './src/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: Env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
})
