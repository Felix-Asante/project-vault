import React from 'react'
import Link from 'next/link'
import { getInitials } from '@/utils'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { formatDistance } from 'date-fns'

import { ProJects } from '@/types/projects'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type ProjectCardProps = {
    project: ProJects
}
export default function ProjectCard(props: ProjectCardProps) {
    const { project } = props

    return (
        <Card>
            <CardContent>
                <div className='flex h-[95%] pt-3'>
                    <Avatar>
                        <AvatarImage src={project?.logo!} alt='Project logo' />
                        <AvatarFallback>
                            {getInitials('Project Name')}
                        </AvatarFallback>
                    </Avatar>
                    <Link
                        href={`/projects/${project.key}/overview`}
                        className='text-base line-clamp-2'
                    >
                        {project.name}
                    </Link>
                </div>
                <p className='text-gray-400 text-sm mt-6'>
                    {formatDistance(new Date(), project.created_at, {
                        addSuffix: true,
                    })}
                </p>
            </CardContent>
        </Card>
    )
}
