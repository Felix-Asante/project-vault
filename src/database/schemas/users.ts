import { SUBSCRIPTION_PLANS } from '@/constants/enum'
import { relations, sql } from 'drizzle-orm'
import {
    decimal,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'

export const subscriptionPlansEnum = pgEnum('plans', [
    SUBSCRIPTION_PLANS.BASIC,
    SUBSCRIPTION_PLANS.PRO,
])

export const UserTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    first_name: text('full_name').notNull(),
    last_name: text('last_name').notNull(),
    photo: text('photo').notNull(),
    email: text('email').notNull().unique(),
    user_id: varchar('user_id', { length: 50 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    plan: uuid('plan')
        .references(() => SubscriptionPlansTable.id)
        .notNull(),
    slug: text('slug').unique().notNull(),
    subscription_ends_at: timestamp('subscription_ends_at'),
    challenges: text('challenges')
        .array()
        .notNull()
        .default(sql`ARRAY[]::text[]`),
})

export const SubscriptionPlansTable = pgTable('subscriptions_plans', {
    id: uuid('id').primaryKey().defaultRandom(),
    label: subscriptionPlansEnum('plans').default(SUBSCRIPTION_PLANS.BASIC),
    price: decimal('price'),
    max_projects: integer('max_projects').default(3),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const userTableRelations = relations(UserTable, ({ one }) => ({
    plan: one(SubscriptionPlansTable, {
        fields: [UserTable.plan],
        references: [SubscriptionPlansTable.id],
    }),
}))
