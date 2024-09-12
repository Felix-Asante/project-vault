import React from 'react'
import { notFound } from 'next/navigation'
import JoinProjectSection from '@/sections/invitations/JoinProjectSection'
import { hasPassed48Hours } from '@/utils/formatDates'

import { onGetInvitationByKey } from '@/lib/actions/invitations'

type pageProps = {
    params: {
        invitationId: string
    }
}
export default async function JoinProject({ params }: pageProps) {
    const { invitationId } = params
    const { error, invitation } = await onGetInvitationByKey(invitationId)

    const errorOrHasExpired =
        error ||
        !invitation ||
        (invitation && hasPassed48Hours(invitation?.created_at!))

    if (errorOrHasExpired) {
        return notFound()
    }

    return (
        <div className='h-screen'>
            <JoinProjectSection invitation={invitation} />
        </div>
    )
}
