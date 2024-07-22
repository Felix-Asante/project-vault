import React from 'react'

import ProjectCard from '@/components/shared/cards/ProjectCard'
import EmptyContent from '@/components/shared/ErrorContent'

export default function ProjectsListSection() {
    const data = [1, 2, 3, 4, 5]
    return (
        <div className='mt-5'>
            {data.length === 0 ? (
                <EmptyContent title='No projects found' />
            ) : (
                <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-4'>
                    {data.map((project, index) => (
                        <ProjectCard key={project} />
                    ))}
                </div>
            )}
        </div>
    )
}
