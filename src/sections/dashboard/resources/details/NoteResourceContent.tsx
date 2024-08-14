'use client'

import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { ForwardIcon, SaveIcon, SparklesIcon } from 'lucide-react'

import { ProjectResource } from '@/types/projects'
import { onUpdateProjectResource } from '@/lib/actions/projectResources'
import { useToast } from '@/components/ui/use-toast'
import Button from '@/components/shared/Button'
import Editor from '@/components/shared/inputs/Editor'

type Props = {
    resource: ProjectResource
}

export default function NoteResourceContent(props: Props) {
    const { resource } = props

    const [content, setContent] = React.useState(resource?.note)

    const updateResourceMutation = useMutation({
        mutationFn: (content: string) =>
            onUpdateProjectResource(resource.id, { note: content }),
    })

    const { toast } = useToast()

    const handleSaveChanges = async () => {
        if (!content) return
        const response = await updateResourceMutation.mutateAsync(content)

        if (response?.error)
            return toast({ description: 'Failed to save changes' })

        toast({
            description: 'Resource saved successfully',
        })
    }

    return (
        <div className='overflow-y-hidden mx-auto px-12 pt-5 2xl:pt-12'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-lg xl:text-xl font-bold'>
                    {resource?.title}
                </h1>
                <div>
                    <Button
                        disabled={!content || updateResourceMutation.isPending}
                        variant='ghost'
                        className='text-primary gap-2'
                        onClick={handleSaveChanges}
                    >
                        <SaveIcon className='w-4 h-4' />
                        <span>
                            {updateResourceMutation.isPending
                                ? 'Saving ...'
                                : 'Save'}
                        </span>
                    </Button>
                    <Button
                        disabled
                        variant='ghost'
                        className='text-primary gap-2'
                    >
                        <SparklesIcon className='w-4 h-4' />
                        <span>Ask Ai</span>
                    </Button>
                    {/* <Button
                        disabled={!content || updateResourceMutation.isPending}
                        variant='ghost'
                        className='text-primary gap-2'
                    >
                        <ForwardIcon className='w-4 h-4' />
                        <span>Share</span>
                    </Button> */}
                </div>
            </div>
            <div className='min-h-screen'>
                <Editor
                    defaultValue={resource?.note ?? undefined}
                    onChange={setContent}
                />
            </div>
        </div>
    )
}
