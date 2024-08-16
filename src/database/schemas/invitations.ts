import { INVITATION_STATUS } from '@/constants/enum'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { RolesTable } from './auth'
import { ProjectTable } from './projects'
import { UserTable } from './users'

export const InvitationsTable = pgTable('invitations', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    email: text('email').notNull(),
    role: uuid('role')
        .notNull()
        .references(() => RolesTable.id),
    status: text('status').default(INVITATION_STATUS.PENDING).notNull(),
    project: uuid('project_id')
        .references(() => ProjectTable.id)
        .notNull(),
    invited_by: uuid('invited_by')
        .references(() => UserTable.id)
        .notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(), //accepted_at, rejected_at
})

export const invitationRelation = relations(InvitationsTable, ({ one }) => ({
    project: one(ProjectTable, {
        fields: [InvitationsTable.project],
        references: [ProjectTable.id],
    }),
    invited_by: one(UserTable, {
        fields: [InvitationsTable.invited_by],
        references: [UserTable.id],
    }),
    role: one(RolesTable, {
        fields: [InvitationsTable.role],
        references: [RolesTable.id],
    }),
}))
