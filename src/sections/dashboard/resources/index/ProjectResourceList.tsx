import { ProjectResourceTypes } from '@/types/projects'
import { onGetAllProjectResources } from '@/lib/actions/projectResources'

import ResourceListRow from './ResourceListRow'
import { TableFilters } from './TableFilters'

interface Props {
    resourceTypes: ProjectResourceTypes[]
    project: string
}

const TableColumns = ['Title', 'Type', 'Created by', 'Updated by']
export default async function ProjectResourceList(props: Props) {
    const { resourceTypes, project } = props
    const { resources } = await onGetAllProjectResources(project)
    return (
        <div>
            <TableFilters resourceTypes={resourceTypes} />
            <div className='mt-4 divide-y'>
                <div className='pb-2 pt-4 px-2 hidden lg:grid grid-cols-2 lg:grid-cols-5 hover:bg-accent/20 gap-4 items-center'>
                    {TableColumns.map((column) => (
                        <p key={column} className='text-gray-600 text-sm'>
                            {column}
                        </p>
                    ))}
                </div>
                {resources.map((resource) => (
                    <ResourceListRow key={resource.id} resource={resource} />
                ))}
            </div>
        </div>
    )
}
