'use client'

import { Fragment, useState } from 'react'
import { PROJECT_RESOURCES_TYPE } from '@/constants/enum'
import { useMutation } from '@tanstack/react-query'
import { FolderIcon, FolderKeyIcon, NotepadTextIcon } from 'lucide-react'
import { useRouter } from 'next13-progressbar'

import { ProjectResourceTypes } from '@/types/projects'
import { onCreateProjectResource } from '@/lib/actions/projectResources'
import { buttonVariants } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'

import CreateResourceModal from './CreateResourceModal'

const getResourceIcon = (type: string) => {
    const icon = {
        [PROJECT_RESOURCES_TYPE.ENV]: (
            <FolderKeyIcon className='w-4 h-4 mr-2' />
        ),
        [PROJECT_RESOURCES_TYPE.NOTE]: (
            <NotepadTextIcon className='w-4 h-4 mr-2' />
        ),
    }[type]

    return icon ?? <FolderIcon className='w-4 h-4 mr-2' />
}

interface Props {
    resourceTypes: ProjectResourceTypes[]
    project: string
}
export default function ResourcesHomeHeader(props: Props) {
    const { resourceTypes, project } = props
    const [selectedType, setSelectedType] = useState<string | null>(null)

    const createProjectResMutation = useMutation({
        mutationFn: onCreateProjectResource,
    })
    const { toast } = useToast()
    const router = useRouter()

    const onSubmit = async (data: { title: string }, reset: Function) => {
        if (!selectedType) {
            toast({
                description: 'Please select a resource type',
                variant: 'destructive',
            })
            return
        }

        const response = await createProjectResMutation.mutateAsync({
            title: data.title,
            project,
            type: selectedType,
        })
        if (response?.error) {
            toast({
                description: 'Something went wrong while creating resource',
                variant: 'destructive',
            })
            return
        }
        router.refresh()
        toast({ description: 'Resource created successfully' })
        reset()
        setSelectedType('')
    }

    return (
        <div className='flex items-center justify-between'>
            <h3 className='text-lg xl:text-xl'>Resources</h3>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className={buttonVariants({
                        className:
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                    })}
                    disabled={resourceTypes.length === 0}
                >
                    Add new ..
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {resourceTypes.map((type, index) => (
                        <Fragment key={type.id}>
                            <DropdownMenuItem
                                onClick={() => setSelectedType(type.id)}
                            >
                                {getResourceIcon(type.name)}
                                <span className='capitalize'>{type.name}</span>
                            </DropdownMenuItem>
                            {resourceTypes.length - 1 !== index && (
                                <DropdownMenuSeparator />
                            )}
                        </Fragment>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <CreateResourceModal
                open={!!selectedType}
                onClose={() => setSelectedType('')}
                onSubmit={onSubmit}
                loading={createProjectResMutation.isPending}
            />
        </div>
    )
}
