'use server'

import { createInvitationRepository } from '@/database/repositories/invitationRepository'
import { getErrorMessage } from '@/utils'

import { SendInvitationDto } from '@/types/dtos/invitation.dto'

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

export async function onSendProjectInvitation(payload: SendInvitationDto) {
    try {
        const invitationRepository = createInvitationRepository()
        await invitationRepository.sendInvitation(payload)
        return { error: null }
    } catch (error) {
        return { error: getErrorMessage(error) }
    }
}
