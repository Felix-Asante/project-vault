'use server'

import { createInvitationRepository } from '@/database/repositories/invitationRepository'
import { getErrorMessage } from '@/utils'
import { handleProcedureErrors } from '@/utils/error'
import { z } from 'zod'

import { ProcedureError } from '@/types/shared'
import { permissionsSchema } from '@/validations/shared'

import { permissionProcedure } from '../procedures'

export async function onGetAllProjectInvitations(projectId: string) {
    try {
        const invitationRepository = createInvitationRepository()
        const invitations =
            await invitationRepository.findAllProjectInvitations(projectId)
        return { error: null, invitations }
    } catch (error) {
        return { error: getErrorMessage(error), invitations: [] }
    }
}

export const onSendProjectInvitation = permissionProcedure
    .createServerAction()
    .input(
        z
            .object({
                email: z.string(),
                role: z.string(),
            })
            .and(permissionsSchema)
    )
    .output(
        z.object({
            error: z.string().nullable(),
        })
    )
    .handler(async ({ input, ctx }) => {
        try {
            const { email, project, role } = input
            const { user, error } = ctx

            if (!user || error) {
                return handleProcedureErrors(error as ProcedureError)
            }

            const invitationRepository = createInvitationRepository()
            await invitationRepository.sendInvitation({
                email,
                role,
                project,
                invited_by: user.id,
            })
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    })

export const onRevokeInvitation = permissionProcedure
    .createServerAction()
    .input(z.object({ invitationId: z.string() }).and(permissionsSchema))
    .handler(async ({ input }) => {
        try {
            const { invitationId } = input
            const invitationRepository = createInvitationRepository()
            await invitationRepository.revokeInvitation(invitationId)
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    })

export const onResendInvitation = permissionProcedure
    .createServerAction()
    .input(z.object({ invitationId: z.string() }).and(permissionsSchema))
    .handler(async ({ input }) => {
        try {
            const { invitationId } = input
            const invitationRepository = createInvitationRepository()
            await invitationRepository.resendInvitation(invitationId)
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    })

export const onGetInvitationByKey = async (key: string) => {
    try {
        const invitationRepository = createInvitationRepository()
        const invitation = await invitationRepository.findInvitationByKey(key)
        return { invitation }
    } catch (error) {
        return { error: getErrorMessage(error) }
    }
}
