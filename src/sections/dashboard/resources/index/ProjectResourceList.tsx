import { EyeIcon, Settings2Icon, Trash2Icon } from 'lucide-react'

import { ProjectResource, ProjectResourceTypes } from '@/types/projects'
import { onGetAllProjectResources } from '@/lib/actions/projectResources'
import { Checkbox } from '@/components/ui/checkbox'
import Button from '@/components/shared/Button'

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

function ResourceListRow({ resource }: { resource: ProjectResource }) {
    const Title = ({ label }: { label: string }) => (
        <p className='lg:hidden text-gray-600 text-sm mb-1.5'>{label}</p>
    )

    return (
        <div className='pb-2 pt-4 px-2 grid grid-cols-2 lg:grid-cols-5 hover:bg-accent/20 gap-4 items-center'>
            <div>
                <Title label='Title' />
                <div className='flex gap-2 items-center'>
                    {/* <Checkbox /> */}
                    <h2 className='font-bold line-clamp-1'>{resource.title}</h2>
                </div>
            </div>
            <div>
                <Title label='Type' />
                <p className='bg-accent py-px m-0 px-4 text-center w-fit capitalize text-sm rounded-full'>
                    {resource.type.name}
                </p>
            </div>
            <p>
                <Title label='Created by' />
                {resource.createdBy.first_name} {resource.createdBy.last_name}
            </p>
            <p>
                <Title label='Last updated by' />
                {resource.lastUpdatedBy?.first_name}{' '}
                {resource.lastUpdatedBy?.last_name}
            </p>
            <div className='flex lg:justify-end gap-3'>
                <Button
                    variant='ghost'
                    className='w-6 h-6 p-1'
                    title='Edit resource title'
                >
                    <Settings2Icon />
                </Button>
                <Button variant='ghost' className='w-6 h-6 p-1' title='delete'>
                    <Trash2Icon />
                </Button>
                <Button
                    variant='ghost'
                    className='w-6 h-6 p-1'
                    title='view resource'
                >
                    <EyeIcon />
                </Button>
            </div>
        </div>
    )
}
