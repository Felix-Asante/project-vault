import React from 'react'
import { UserRoundPlusIcon } from 'lucide-react'

import Button from '@/components/shared/Button'

type MembersHeadersProps = {}
export default function MembersHeaders(props: MembersHeadersProps) {
    return (
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Members</h1>
                <p className='mt-1 font-light'>
                    Manage team members and invitations
                </p>
            </div>
            <Button className='text-white font-semibold gap-2'>
                <UserRoundPlusIcon className='w-4 h-4' />
                <span>Add member</span>
            </Button>
        </div>
    )
}
