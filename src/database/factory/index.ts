import { db } from '@/database/index'

import { RolesTable } from '../schemas/auth'
import { ProjectResourceType } from '../schemas/projects'
import { SubscriptionPlansTable } from '../schemas/users'
import { PLANS, RESOURCE_TYPES, ROLES } from './data'

async function seedDb() {
    try {
        const plans = await db.select().from(SubscriptionPlansTable)
        const roles = await db.select().from(RolesTable)
        const resourceTypes = await db.select().from(ProjectResourceType)

        if (plans.length === 0) {
            await db.insert(SubscriptionPlansTable).values(PLANS)
        }

        if (roles.length === 0) {
            await db.insert(RolesTable).values(ROLES)
        }
        if (resourceTypes.length == 0) {
            await db.insert(ProjectResourceType).values(RESOURCE_TYPES)
        }
    } catch (error) {
        console.error('Error seeding database', error)
        process.exit(1)
    }
}

seedDb()
