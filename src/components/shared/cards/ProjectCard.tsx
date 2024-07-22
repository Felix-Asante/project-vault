import React from 'react'
import { getInitials } from '@/utils'
import { AvatarFallback } from '@radix-ui/react-avatar'

import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

export default function ProjectCard() {
    return (
        <Card>
            <CardContent>
                <div className='flex items-center pt-3'>
                    <Avatar>
                        <AvatarFallback>
                            {getInitials('Project name')}
                        </AvatarFallback>
                    </Avatar>
                    <p className='text-base'>Project name</p>
                </div>
                <p className='text-gray-400 text-sm mt-6'>45 days ago</p>
            </CardContent>
        </Card>
    )
}
