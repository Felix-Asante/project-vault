import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const RolesTable = pgTable('roles', {
    id: uuid('id').primaryKey().defaultRandom(),
    label: text('label').unique().notNull(),
    permissions: text('permissions')
        .array()
        .default(sql`'{}'::text[]`)
        .notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})

// export const PermissionsTable = pgTable('permissions', {
//     id: uuid('id').primaryKey().defaultRandom(),
//     label: text('label').unique().notNull(),
//     created_at: timestamp('created_at').defaultNow(),
//     updated_at: timestamp('updated_at').defaultNow(),
// })

// export const RolePermissionsTable = pgTable('role_permissions', {
//     id: uuid('id').primaryKey().defaultRandom(),
//     role: uuid('role')
//         .references(() => RolesTable.id, { onDelete: 'cascade' })
//         .notNull(),
//     permission: uuid('permission')
//         .references(() => PermissionsTable.id, { onDelete: 'cascade' })
//         .notNull(),
//     created_at: timestamp('created_at').defaultNow(),
//     updated_at: timestamp('updated_at').defaultNow(),
// })

// export const rolePermissionsTableRelations = relations(
//     RolePermissionsTable,
//     ({ many, one }) => ({
//         role: many(RolesTable),
//         permission: many(RolesTable),
//     })
// )
