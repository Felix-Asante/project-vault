import React, { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

import { ButtonProps, ShadcnButton } from '../ui/button'

interface ButtonProp extends ButtonProps {
    children?: ReactNode
    startContent?: ReactNode
    endContent?: ReactNode
    loading?: boolean
}
export default function Button(props: ButtonProp) {
    const {
        children,
        loading = false,
        disabled,
        startContent,
        endContent,
        ...buttonProps
    } = props
    return (
        <ShadcnButton disabled={disabled || loading} {...buttonProps}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {!loading && startContent && (
                <div className='mr-2'>{startContent}</div>
            )}
            {children}
            {!loading && endContent && (
                <div className='ml-2'>{startContent}</div>
            )}
        </ShadcnButton>
    )
}
