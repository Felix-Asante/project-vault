import Link from 'next/link'

import { Query } from '@/types/shared'
import { onGetUserProjects } from '@/lib/actions/projects'
import ProjectCard from '@/components/shared/cards/ProjectCard'
import EmptyContent from '@/components/shared/ErrorContent'

interface Props {
    query: Query
}
export default async function ProjectsListSection(props: Props) {
    const { query } = props
    const { projects, error } = await onGetUserProjects({ ...query })

    return (
        <div className='mt-5'>
            {projects.length === 0 ? (
                <EmptyContent title='No projects found' />
            ) : (
                <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-4'>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    )
}
