import { relations } from 'drizzle-orm'
import {
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core'

import { RolesTable } from './auth'
import { UserTable } from './users'

export const ProjectTable = pgTable(
    'projects',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: text('name').notNull(),
        description: text('description').notNull(),
        logo: text('logo'),
        link: text('logo'),
        key: text('key').notNull(),
        created_at: timestamp('created_at').defaultNow().notNull(),
        updated_at: timestamp('updated_at').defaultNow().notNull(),
        deleted_at: timestamp('deleted_at'),
        total_members: integer('total_members').default(1).notNull(),
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
    role: uuid('role')
        .references(() => RolesTable.id, { onDelete: 'cascade' })
        .notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
})

export const ProjectNotes = pgTable('project_notes', {
    id: uuid('id').primaryKey().defaultRandom(),
    project_id: uuid('project_id')
        .references(() => ProjectTable.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    created_by: uuid('created_by')
        .references(() => UserTable.id)
        .notNull(),
    last_updated_by: uuid('last_updated_by')
        .references(() => UserTable.id)
        .notNull(),
    title: text('title').notNull(),
    note: text('note'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
})

export const ProjectNotesRelation = relations(ProjectNotes, ({ one }) => ({
    lastUpdatedBy: one(UserTable, {
        fields: [ProjectNotes.last_updated_by],
        references: [UserTable.id],
    }),
    project: one(ProjectTable, {
        fields: [ProjectNotes.project_id],
        references: [ProjectTable.id],
    }),

    createdBy: one(UserTable, {
        fields: [ProjectNotes.created_by],
        references: [UserTable.id],
    }),
}))

export const projectMembersRelation = relations(
    ProjectMembersTable,
    ({ one }) => ({
        project: one(ProjectTable, {
            fields: [ProjectMembersTable.project_id],
            references: [ProjectTable.id],
        }),
        user: one(UserTable, {
            fields: [ProjectMembersTable.user_id],
            references: [UserTable.id],
        }),
        role: one(RolesTable, {
            fields: [ProjectMembersTable.role],
            references: [RolesTable.id],
        }),
    })
)
