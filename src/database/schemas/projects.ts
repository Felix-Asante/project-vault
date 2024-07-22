import {
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core'

import { UserTable } from './users'

export const ProjectTable = pgTable(
    'projects',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: text('name').notNull(),
        description: text('description'),
        logo: text('logo'),
        created_at: timestamp('created_at').defaultNow(),
        updated_at: timestamp('updated_at').defaultNow(),
        deleted_at: timestamp('deleted_at'),
        total_members: integer('total_members').default(1),
    },
    (table) => {
        return {
            nameIdx: index('name_idx').on(table.name),
        }
    }
)

export const ProjectMembersTable = pgTable('project_members', {
    id: uuid('id').primaryKey().defaultRandom(),
    project_id: uuid('project_id')
        .references(() => ProjectTable.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    user_id: uuid('user_id')
        .references(() => UserTable.id, { onDelete: 'cascade' })
        .notNull(),
    role: text('role').default('owner'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
})
