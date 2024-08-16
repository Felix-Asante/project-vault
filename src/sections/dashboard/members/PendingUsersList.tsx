import React from 'react'
import { differenceInBusinessDays, formatDate } from 'date-fns'

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
    console.log(
        'hasPassed48h:',
        differenceInBusinessDays(new Date(), member.created_at!)
    )
    const hasPassed48h =
        differenceInBusinessDays(new Date(), member.created_at!) > 2

    return (
        <div className='p-4 border-t border-border'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-y-5'>
                <div>
                    <p className='text-sm 2xl:text-base'>{member.email}</p>
                    <p className='text-gray-500 text-sm  2xl:text-base'>
                        Assigned role: {member.role.label}
                    </p>
                </div>
                <p className='text-sm  2xl:text-base'>
                    Invitation sent:{' '}
                    {formatDate(member.created_at!, 'Mo MMM yyyy HH:mm')}
                </p>

                {hasPassed48h ? (
                    <Button
                        variant='destructive'
                        className='text-sm 2xl:text-base'
                    >
                        Revoke
                    </Button>
                ) : null}
            </div>
        </div>
    )
}
