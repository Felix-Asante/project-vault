import { redirect } from 'next/navigation'
import projectRepository from '@/database/repositories/projectRepository'
import { createUsersRepository } from '@/database/repositories/usersRepository'
import { currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'
import { createServerActionProcedure, ZSAError } from 'zsa'

export const authProcedure = createServerActionProcedure().handler(async () => {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) {
            return {
                error: { message: 'User not authenticated', action: 'logout' },
            }
        }

        const usersRepository = createUsersRepository()
        const user = await usersRepository.getUserByClerkId(clerkUser.id)

        if (!user) {
            return {
                error: { message: 'User not found', action: 'logout' },
            }
        }

        return { user }
    } catch (error) {
        return {
            error: { message: 'User not authenticated', action: 'logout' },
        }
    }
})

export const permissionProcedure = createServerActionProcedure(authProcedure)
    .input(
        z.object({
            permission: z.string(),
            project: z.string(),
        })
    )
    .handler(async ({ ctx, input }) => {
        try {
            const { user, error } = ctx
            const { permission, project } = input

            if (error) {
                return { error, hasPermission: false, user: null }
            }

            const [projectMember] =
                await projectRepository.getProjectMemberByEmail(
                    user.email,
                    project
                )

            if (!projectMember) {
                throw new ZSAError(
                    'NOT_FOUND',
                    'You are not a member of this project'
                )
            }

            const hasPermission = projectMember.role.permissions.includes(
                permission.trim()
            )

            if (!hasPermission) {
                throw new ZSAError(
                    'FORBIDDEN',
                    'You do not have permission to perform this action'
                )
            }

            return { hasPermission, user }
        } catch (error) {
            throw new ZSAError(
                'FORBIDDEN',
                'You do not have permission to perform this action'
            )
        }
    })
