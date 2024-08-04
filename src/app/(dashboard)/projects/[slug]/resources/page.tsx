import { redirect } from 'next/navigation'
import ProjectResourceList from '@/sections/dashboard/resources/index/ProjectResourceList'
import ResourcesHomeHeader from '@/sections/dashboard/resources/index/ResourcesHomeHeader'

import { onGetProjectResourcesTypes } from '@/lib/actions/projectResources'
import { onGetProjectsByKey } from '@/lib/actions/projects'

type PageProps = {
    params: {
        slug: string
    }
    searchParams: {
        search: string
        type: string
    }
}
export default async function Notes(props: PageProps) {
    const { params, searchParams } = props
    const [resourceType, { project }] = await Promise.all([
        onGetProjectResourcesTypes(),
        onGetProjectsByKey(params.slug),
    ])

    if (!project) redirect('/projects')

    return (
        <div className='pt-3 pr-4'>
            <ResourcesHomeHeader
                resourceTypes={resourceType.types}
                project={project.id}
            />
            <div className='border p-3 rounded-md mt-5'>
                <ProjectResourceList
                    resourceTypes={resourceType.types}
                    project={project.id}
                    query={searchParams}
                />
            </div>
        </div>
    )
}
