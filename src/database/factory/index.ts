import { db } from '@/database/index'

import { RolesTable } from '../schemas/auth'
import { SubscriptionPlansTable } from '../schemas/users'
import { PLANS, ROLES } from './data'

async function seedDb() {
    try {
        const plans = await db.select().from(SubscriptionPlansTable)
        const roles = await db.select().from(RolesTable)

        if (plans.length === 0) {
            await db.insert(SubscriptionPlansTable).values(PLANS)
        }

        if (roles.length === 0) {
            await db.insert(RolesTable).values(ROLES)
        }
    } catch (error) {
        console.error('Error seeding database', error)
        process.exit(1)
    }
}

seedDb()
