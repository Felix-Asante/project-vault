'use server'

import { getErrorMessage } from '@/utils'
import { Env } from '@/utils/env'
import { Resend } from 'resend'

import { SendInvitationEmailDto } from '@/types/dtos/invitation.dto'
import SendInvitationEmailTemplate from '@/components/emails/SendInvitationEmail'

const resend = new Resend(Env.RESEND_API_KEY)

export async function onSendInvitationEmail(data: SendInvitationEmailDto) {
    try {
        const { invitedBy, invitedUserEmail, project, invitationKey } = data

        const invitationLink = `${Env.NEXT_PUBLIC_VERCEL_URL}/invitations/join-team/${invitationKey}`

        const emailResponse = await resend.emails.send({
            from: `${Env.NEXT_PUBLIC_EMAIL_SENDER}`,
            to:
                process.env.NODE_ENV === 'development'
                    ? Env.TEST_EMAIL
                    : invitedUserEmail,
            subject: 'Project Invitation',
            react: SendInvitationEmailTemplate({
                invitedUsername: invitedUserEmail,
                invitedByUsername: `${invitedBy.first_name} ${invitedBy.last_name} `,
                invitedByEmail: invitedBy.email,
                projectName: project.name,
                inviteLink: invitationLink,
            }),
        })

        if (emailResponse?.error) {
            return { error: getErrorMessage(emailResponse) }
        }
        return { error: null }
    } catch (error) {
        console.log(error)
        return { error: getErrorMessage(error) }
    }
}
