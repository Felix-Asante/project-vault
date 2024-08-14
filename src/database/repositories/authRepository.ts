import { db } from '@/database'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

import { RolesTable } from '../schemas/auth'
import { UserTable } from '../schemas/users'

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

    async getAllRoles() {
        return await db.query.RolesTable.findMany()
    }

    async createRole(data: CreateRoleDto) {
        return await db.insert(RolesTable).values(data).returning()
    }

    async getCurrentUser() {
        const user = await currentUser()
        if (!user) throw new Error('User not found')

        return await db.query.UserTable.findFirst({
            where: eq(UserTable.user_id, user.id),
            with: {
                plan: true,
            },
        })
    }
}

export default new AuthRepository()
