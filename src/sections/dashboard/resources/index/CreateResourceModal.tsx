import React from 'react'

import { createProjectResourceSchema } from '@/validations/projects'
import { useFormValidation } from '@/hooks/useFormValidation'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import Button from '@/components/shared/Button'
import FormInput from '@/components/shared/inputs/FormInput'

type Props = {
    open: boolean
    onClose: () => void
    onSubmit: (data: any, reset: Function) => void
    title?: string
    defaultValue?: {
        title: string
    }
    loading?: boolean
}
export default function CreateResourceModal(props: Props) {
    const { open, onClose, onSubmit, title, defaultValue, loading } = props
    const form = useFormValidation<{ title: string }>({
        schema: createProjectResourceSchema,
        defaultValue,
    })

    const onFormSubmit = (data: { title: string }) => {
        onSubmit(data, form.reset)
    }
    return (
        <Dialog open={open} onOpenChange={loading ? () => {} : onClose}>
            <DialogContent
                onInteractOutside={(e) => {
                    e.preventDefault()
                }}
            >
                <DialogHeader>
                    <DialogTitle>{title ?? 'Create New Resource'}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className='mt-6'>
                        <FormInput
                            name='title'
                            control={form.control}
                            placeholder='Resource Title'
                            max={50}
                        />
                        <div className='mt-7 flex gap-4 items-center'>
                            <Button
                                variant={'outline'}
                                type='button'
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                loading={loading}
                                type='button'
                                onClick={form.handleSubmit(onFormSubmit)}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
