import React from 'react'
import { getInitials } from '@/utils'

import { ProjectMembers } from '@/types/projects'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
    members: ProjectMembers[]
}
export default function MembersTable(props: Props) {
    const { members } = props

    return (
        <div>
            {members.map((member) => (
                <div key={member.id} className='p-4 border-t'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            {' '}
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={member.user.photo} />
                                <AvatarFallback>
                                    {getInitials(member.user.first_name)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='text-sm'>
                                    {member.user.first_name}{' '}
                                    {member.user.last_name}
                                </p>
                                <p className='text-gray-500 text-sm'>
                                    {member.user.email}
                                </p>
                            </div>
                        </div>
                        <p className='text-gray-500 font-medium'>
                            {member.role?.label}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
