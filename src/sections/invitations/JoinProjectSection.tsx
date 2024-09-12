import React from 'react'
import { getInitials } from '@/utils'

import { InvitedMembers } from '@/types/projects'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from '@/components/shared/Button'

type Props = {
    invitation: InvitedMembers
}
export default function JoinProjectSection(props: Props) {
    const { invitation } = props
    const fullName = `${invitation.user.first_name}  ${invitation.user.last_name}`

    return (
        <div className='h-full items-center flex justify-center'>
            <div className='bg-accent rounded-lg w-[80%] sm:w-1/2 lg:w-[35%] p-5'>
                <div className=' flex flex-col gap-y-6  items-center mb-9 '>
                    <Avatar className='w-16 h-16'>
                        <AvatarImage src={invitation.user?.photo} />
                        <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                    </Avatar>
                    <p className='text-center'>
                        <strong className='capitalize'>{fullName}</strong> has
                        invited you to collaborate on {invitation.project.name}
                    </p>
                </div>

                <p className='text-gray-400 text-center text-sm'>
                    Your invitation expires in 48 hrs
                </p>
                <div className='flex gap-5 items-center mt-5 justify-center mb-2'>
                    <Button
                        variant='secondary'
                        className='border border-gray-600 bg-transparent hover:bg-black/30 hover:border-black'
                    >
                        Decline
                    </Button>
                    <Button className='text-white'>Accept invitation</Button>
                </div>
            </div>
        </div>
    )
}
