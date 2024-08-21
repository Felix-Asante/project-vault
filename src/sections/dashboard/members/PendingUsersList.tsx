import React from 'react'
import { hasPassed48Hours } from '@/utils/formatDates'
import { format, formatDate } from 'date-fns'

import { InvitedMembers } from '@/types/projects'
import Button from '@/components/shared/Button'
import EmptyContent from '@/components/shared/ErrorContent'

type Props = {
    members: InvitedMembers[]
}
export default function PendingUsersList(props: Props) {
    const { members } = props
    return (
        <div>
            {members.length === 0 ? (
                <EmptyContent title='You have no pending invitations at the moment.' />
            ) : (
                members.map((member) => <Row key={member.id} member={member} />)
            )}
        </div>
    )
}

function Row({ member }: { member: InvitedMembers }) {
    const hasPassed48h =
        member.created_at && hasPassed48Hours(member.created_at)

    return (
        <div className='p-4 border-t border-border'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-y-5'>
                <div>
                    <p className='text-sm 2xl:text-base'>{member.email}</p>
                    <p className='text-gray-500 text-sm  2xl:text-base'>
                        Assigned role: {member.role.label}
                    </p>
                </div>
                {member.created_at && (
                    <p className='text-sm  2xl:text-base text-left'>
                        Invitation sent:{' '}
                        {format(member.created_at, 'do MMM yyyy HH:mm')}
                    </p>
                )}

                {hasPassed48h ? (
                    <Button
                        variant='destructive'
                        className='text-sm 2xl:text-base'
                    >
                        Revoke
                    </Button>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}
