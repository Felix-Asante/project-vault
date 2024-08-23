// better than the other approaches
// the singleton pattern causes caching issues and makes the code harder to test
// server actions cannot be executed on client-side

// the factory pattern : create a new instance every time the function is called
//allows dependency injection = can optionally pass dependencies to the factory function

import { INVITATION_STATUS } from '@/constants/enum'
import { db } from '@/database'
import { generateRandomString, getErrorMessage } from '@/utils'
import { hasPassed48Hours } from '@/utils/formatDates'
import { and, desc, eq, ilike, sql } from 'drizzle-orm'

import { Invitation } from '@/types/auth'
import { SendInvitationDto } from '@/types/dtos/invitation.dto'
import { InvitedMembers } from '@/types/projects'
import { PaginationOptions, PaginationResult } from '@/types/shared'
import { onSendInvitationEmail } from '@/lib/actions/emails'

import { RolesTable } from '../schemas/auth'
import { InvitationsTable } from '../schemas/invitations'
import { UserTable } from '../schemas/users'
import projectRepository from './projectRepository'

export type InvitationRepository = {
    findAllProjectInvitations(projectId: string): Promise<Invitation[]>
    sendInvitation(payload: SendInvitationDto): Promise<void>
    findPendingInvitationsByProject(
        projectId: string,
        options?: PaginationOptions
    ): Promise<PaginationResult<InvitedMembers> | null>
    findInvitationByEmail(
        email: string,
        project: string
    ): Promise<InvitedMembers>
    findInvitationById(id: string): Promise<InvitedMembers>
    resendInvitation(invitationId: string): Promise<void>
    revokeInvitation(invitationId: string): Promise<void>
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

        async findInvitationByEmail(email, project) {
            const [invitation] = await db
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
                .innerJoin(RolesTable, eq(RolesTable.id, InvitationsTable.role))
                .where(
                    and(
                        eq(InvitationsTable.project, project),
                        eq(InvitationsTable.email, email)
                    )
                )
                .orderBy(desc(InvitationsTable.created_at))

            return invitation
        },
        async findInvitationById(invitationId) {
            const [invitation] = await db
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
                .innerJoin(RolesTable, eq(RolesTable.id, InvitationsTable.role))
                .where(eq(InvitationsTable.id, invitationId))
                .orderBy(desc(InvitationsTable.created_at))

            return invitation
        },

        async findPendingInvitationsByProject(projectId, options) {
            try {
                const { limit = 10, page = 1, search = '' } = options ?? {}

                const offset = (page - 1) * limit

                const invitedMembers = await db
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
                    .orderBy(desc(InvitationsTable.created_at))

                const [{ count = 1 }] = await db
                    .select({
                        count: sql`count(*)`,
                    })
                    .from(InvitationsTable)
                    .where(eq(InvitationsTable.project, projectId))
                const totalPages = Math.ceil((count as number) / limit)

                return {
                    items: invitedMembers,
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
            await db.transaction(async (trx) => {
                const { email, role, project, invited_by } = payload
                const invitationKey = generateRandomString(32)

                const selectedRole = await trx.query.RolesTable.findFirst({
                    where: eq(RolesTable.id, role),
                })
                const user = await trx.query.UserTable.findFirst({
                    where: eq(UserTable.id, invited_by),
                })

                const activeProject =
                    await projectRepository.getProjectById(project)

                if (!activeProject) {
                    throw new Error('Project not found')
                }

                if (!selectedRole) {
                    throw new Error('Role not found')
                }
                if (!user) {
                    throw new Error('Unauthorized:login to invite users')
                }

                // check if user is already a member of the project

                const [member] =
                    await projectRepository.getProjectMemberByEmail(
                        email,
                        project
                    )

                if (member) {
                    throw new Error('User is already a member of the project')
                }

                // check if the user is already invited within the last 48h
                const invitedMember = await this.findInvitationByEmail(
                    email,
                    project
                )
                const alreadyInvited = invitedMember
                // &&
                // invitedMember.created_at &&
                // !hasPassed48Hours(invitedMember.created_at)

                if (alreadyInvited) {
                    throw new Error('User has already been invited')
                }

                // create user
                await trx.insert(InvitationsTable).values({
                    email,
                    role: selectedRole.id,
                    project,
                    invited_by: user.id,
                    status: INVITATION_STATUS.PENDING,
                    created_at: new Date(),
                    updated_at: new Date(),
                    key: invitationKey,
                })

                // send email
                const { error } = await onSendInvitationEmail({
                    invitedBy: user,
                    invitationKey,
                    invitedUserEmail: email,
                    project: activeProject,
                })

                if (error) {
                    throw error
                }
            })
        },

        async resendInvitation(invitationId) {
            try {
                const invitation = await this.findInvitationById(invitationId)
                if (!invitation) {
                    throw new Error('Invitation not found')
                }

                // resend email
            } catch (error) {
                throw new Error(getErrorMessage(error))
            }
        },

        async revokeInvitation(invitationId) {
            const invitation = await this.findInvitationById(invitationId)
            if (!invitation) {
                throw new Error('Invitation not found')
            }

            await db
                .delete(InvitationsTable)
                .where(eq(InvitationsTable.id, invitationId))
        },
    }
}
