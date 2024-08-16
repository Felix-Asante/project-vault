// better than the other approaches
// the singleton pattern causes caching issues and makes the code harder to test
// server actions cannot be executed on client-side

// the factory pattern : create a new instance every time the function is called
//allows dependency injection = can optionally pass dependencies to the factory function

import { INVITATION_STATUS } from '@/constants/enum'
import { db } from '@/database'
import { getErrorMessage } from '@/utils'
import { and, eq, ilike, or, sql } from 'drizzle-orm'

import { Invitation } from '@/types/auth'
import { SendInvitationDto } from '@/types/dtos/invitation.dto'
import { InvitedMembers, ProjectMembers } from '@/types/projects'
import { PaginationOptions, PaginationResult } from '@/types/shared'

import { RolesTable } from '../schemas/auth'
import { InvitationsTable } from '../schemas/invitations'
import { UserTable } from '../schemas/users'

export type InvitationRepository = {
    findAllProjectInvitations(projectId: string): Promise<Invitation[]>
    sendInvitation(payload: SendInvitationDto): Promise<void>
    findPendingInvitationsByProject(
        projectId: string,
        options?: PaginationOptions
    ): Promise<PaginationResult<InvitedMembers> | null>
}
export function createInvitationRepository(): InvitationRepository {
    return {
        async findAllProjectInvitations(projectId: string) {
            return db.query.InvitationsTable.findMany({
                where: eq(InvitationsTable.project, projectId),
                with: {
                    role: true,
                    invited_by: true,
                },
            })
        },

        async findPendingInvitationsByProject(projectId, options) {
            try {
                const { limit = 10, page = 1, search = '' } = options ?? {}

                const offset = (page - 1) * limit

                const projectMembers = await db
                    .select({
                        id: InvitationsTable.id,
                        user_id: InvitationsTable.id,
                        email: InvitationsTable.email,
                        project_id: InvitationsTable.project,
                        created_at: InvitationsTable.created_at,
                        updated_at: InvitationsTable.updated_at,
                        role: RolesTable,
                    })
                    .from(InvitationsTable)

                    .innerJoin(
                        RolesTable,
                        eq(RolesTable.id, InvitationsTable.role)
                    )
                    .where(
                        and(
                            eq(InvitationsTable.project, projectId),
                            search
                                ? ilike(InvitationsTable.email, `%${search}%`)
                                : undefined
                        )
                    )
                    .limit(limit)
                    .offset(offset)

                const [{ count = 1 }] = await db
                    .select({
                        count: sql`count(*)`,
                    })
                    .from(InvitationsTable)
                    .where(eq(InvitationsTable.project, projectId))
                const totalPages = Math.ceil((count as number) / limit)

                return {
                    items: projectMembers,
                    metadata: {
                        currentPage: page,
                        limit,
                        totalPages,
                        totalCount: count as number,
                    },
                }
            } catch (error) {
                throw new Error(getErrorMessage(error))
            }
        },

        async sendInvitation(payload) {
            db.transaction(async (trx) => {
                const { email, role, project, invited_by } = payload
                const selectedRole = await trx.query.RolesTable.findFirst({
                    where: eq(RolesTable.id, role),
                })
                const user = await trx.query.UserTable.findFirst({
                    where: eq(UserTable.id, invited_by),
                })
                if (!selectedRole) {
                    throw new Error('Role not found')
                }
                if (!user) {
                    throw new Error('Unauthorized:login to invite users')
                }

                // create user
                await trx.insert(InvitationsTable).values({
                    email,
                    role: selectedRole.id,
                    project,
                    invited_by: user.id,
                    status: INVITATION_STATUS.PENDING,
                })

                // send email
            })
        },
    }
}
