'use client'

import { useState } from 'react'

import { createProjectSchema } from '@/validations/projects'
import { useFormValidation } from '@/hooks/useFormValidation'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
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

    const form = useFormValidation({ schema: createProjectSchema })

    const handleSubmit = (data: any) => {}

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
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button type='submit'>Create</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
