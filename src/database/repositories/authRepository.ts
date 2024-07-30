import { db } from '@/database'
import { eq } from 'drizzle-orm'

import { RolesTable } from '../schemas/auth'

type CreateRoleDto = {
    label: string
    permissions: string[]
}

class AuthRepository {
    async getRoleByLabel(label: string) {
        return await db.query.RolesTable.findFirst({
            where: eq(RolesTable.label, label),
        })
    }

    async createRole(data: CreateRoleDto) {
        return await db.insert(RolesTable).values(data).returning()
    }
}

export default new AuthRepository()
