'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { CreateProjectDto } from '@/types/dtos/project.dto'
import { createProjectSchema } from '@/validations/projects'
import { onCreateProject } from '@/lib/actions/projects'
import { useFormValidation } from '@/hooks/useFormValidation'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import Button from '@/components/shared/Button'
import SearchInput from '@/components/shared/inputs/SearchInput'

import CreateProjectForm from '../CreateProjectForm'

export default function DashboardHomeHeader() {
    const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false)

    return (
        <>
            <div className='flex items-center justify-between '>
                <div className='w-[60%]'>
                    <SearchInput placeholder='Search Projects' />
                </div>
                <Button
                    className='text-white'
                    onClick={() => setOpenCreateProjectModal(true)}
                >
                    Add new project
                </Button>
            </div>
            <CreateProjectModal
                open={openCreateProjectModal}
                onClose={() => setOpenCreateProjectModal(false)}
            />
        </>
    )
}

type CreateProjectModalProps = {
    open: boolean
    onClose: () => void
}
function CreateProjectModal(props: CreateProjectModalProps) {
    const { open, onClose } = props

    const form = useFormValidation<CreateProjectDto>({
        schema: createProjectSchema,
    })

    const createProjectMutation = useMutation({
        mutationFn: onCreateProject,
    })

    const { toast } = useToast()
    const router = useRouter()

    const handleSubmit = async (data: CreateProjectDto) => {
        const response = await createProjectMutation.mutateAsync(data)
        if (response?.error) {
            return toast({
                description: response.error,
                variant: 'destructive',
            })
        }
        toast({ description: 'Project created successfully' })
        form.reset()
        onClose()
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                onInteractOutside={(e) => {
                    e.preventDefault()
                }}
            >
                <DialogHeader className='mb-3'>
                    Create a new project
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <CreateProjectForm control={form.control} />
                        <div className='flex justify-end gap-4 mt-5'>
                            <Button
                                type='button'
                                variant='outline'
                                onClick={() => {
                                    form.reset()
                                    onClose()
                                }}
                                disabled={createProjectMutation.isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                loading={createProjectMutation.isPending}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
