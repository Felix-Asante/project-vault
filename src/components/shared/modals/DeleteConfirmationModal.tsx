import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import Button from '../Button'

type Props = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    description?: string
    loading?: boolean
}
export default function DeleteConfirmationModal(props: Props) {
    const {
        isOpen,
        onClose,
        onConfirm,
        title,
        description,
        loading = false,
    } = props

    if (!isOpen) return null
    return (
        <Dialog onOpenChange={onClose} open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title ?? 'Delete Confirmation'}</DialogTitle>
                </DialogHeader>
                {description || 'Are you sure you want to delete this item?'}
                <div className='flex items-center mt-4 gap-3'>
                    <Button
                        disabled={loading}
                        variant='outline'
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button loading={loading} onClick={onConfirm}>
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
