'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { EyeIcon, Settings2Icon, Trash2Icon } from 'lucide-react'

import { ProjectResource } from '@/types/projects'
import { onUpdateProjectResource } from '@/lib/actions/projectResources'
import { useToast } from '@/components/ui/use-toast'
import Button from '@/components/shared/Button'

import CreateResourceModal from './CreateResourceModal'

enum ResourceModal {
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
    DEFAULT = 'DEFAULT',
}

type ResourceAction = {
    action: keyof typeof ResourceModal
    resource: ProjectResource | null
}

type CreateResPayload = {
    data: { title: string }
    id: string
}
export default function ResourceListRow({
    resource,
}: {
    resource: ProjectResource
}) {
    const [resourceAction, setResourceAction] = useState<ResourceAction>({
        action: ResourceModal.DEFAULT,
        resource: null,
    })

    const { toast } = useToast()
    const router = useRouter()

    const updateResourceMutation = useMutation({
        mutationFn: ({ id, data }: CreateResPayload) =>
            onUpdateProjectResource(id, data),
    })

    const closeModal = () =>
        setResourceAction({ action: ResourceModal.DEFAULT, resource: null })

    const deleteResource = async () => {}

    const updateResource = async (data: { title: string }, reset: Function) => {
        if (!data.title || !resourceAction.resource) {
            toast({
                description: 'Invalid details provided',
                variant: 'destructive',
            })
            return
        }

        closeModal()

        const response = await updateResourceMutation.mutateAsync({
            id: resourceAction.resource.id,
            data,
        })
        if (response?.error) {
            toast({
                description: 'Something went wrong while updating resource',
                variant: 'destructive',
            })
            return
        }
        router.refresh()
        toast({ description: 'Resource updated successfully' })
        reset()
    }

    const Modal = {
        [ResourceModal.DELETE]: () => <div>Delete</div>,
        [ResourceModal.UPDATE]: () => (
            <CreateResourceModal
                open
                onClose={closeModal}
                onSubmit={updateResource}
                defaultValue={{
                    title: resource.title,
                }}
                title='Update Resource'
                loading={updateResourceMutation.isPending}
            />
        ),
        DEFAULT: () => null,
    }[resourceAction.action]

    const Title = ({ label }: { label: string }) => (
        <p className='lg:hidden text-gray-600 text-sm mb-1.5'>{label}</p>
    )

    return (
        <>
            <div className='pb-2 pt-4 px-2 grid grid-cols-2 lg:grid-cols-5 hover:bg-accent/20 gap-4 items-center'>
                <div>
                    <Title label='Title' />
                    <div className='flex gap-2 items-center'>
                        {/* <Checkbox /> */}
                        <h2 className='font-bold line-clamp-1'>
                            {resource.title}
                        </h2>
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
                    {resource.createdBy.first_name}{' '}
                    {resource.createdBy.last_name}
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
                        onClick={() => {
                            setResourceAction({
                                action: ResourceModal.UPDATE,
                                resource,
                            })
                        }}
                    >
                        <Settings2Icon />
                    </Button>
                    <Button
                        variant='ghost'
                        className='w-6 h-6 p-1'
                        title='delete'
                        onClick={() => {
                            setResourceAction({
                                action: ResourceModal.DELETE,
                                resource,
                            })
                        }}
                    >
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
            <Modal />
        </>
    )
}
