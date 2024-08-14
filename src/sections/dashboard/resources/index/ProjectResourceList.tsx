import { ProjectResourceTypes } from '@/types/projects'
import { Query } from '@/types/shared'
import { onGetAllProjectResources } from '@/lib/actions/projectResources'
import EmptyContent from '@/components/shared/ErrorContent'

import ResourceListRow from './ResourceListRow'
import { TableFilters } from './TableFilters'

interface Props {
    resourceTypes: ProjectResourceTypes[]
    project: string
    query: Query
}

const TableColumns = ['Title', 'Type', 'Created by', 'Updated by']
export default async function ProjectResourceList(props: Props) {
    const { resourceTypes, project, query } = props
    const { resources } = await onGetAllProjectResources(project, query)

    return (
        <div>
            <TableFilters resourceTypes={resourceTypes} />
            <div className='mt-4 divide-y divide-border'>
                <div className='pb-2 pt-4 px-2 hidden lg:grid grid-cols-2 lg:grid-cols-5 hover:bg-accent/20 gap-4 items-center'>
                    {TableColumns.map((column) => (
                        <p key={column} className='text-gray-600 text-sm'>
                            {column}
                        </p>
                    ))}
                </div>
                {resources.length === 0 ? (
                    <EmptyContent title='No Resource Found' />
                ) : (
                    resources.map((resource) => (
                        <ResourceListRow
                            key={resource.id}
                            resource={resource}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
