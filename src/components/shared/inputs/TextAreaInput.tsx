import React from 'react'
import { useController } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea, TextareaProps } from '@/components/ui/textarea'

interface TextAreaInputProp extends TextareaProps {
    control: any
    name: string
    label?: string
    placeholder?: string
    defaultValue?: string
    className?: string
}
export default function TextAreaInput({
    control,
    name,
    label,
    placeholder,
    className,
    defaultValue,
    ...rest
}: TextAreaInputProp) {
    const { field, fieldState } = useController({ name, control, defaultValue })
    return (
        <div className={className}>
            <Label htmlFor={name} className='mb-3 block'>
                {label}
            </Label>
            <Textarea
                className='w-full h-24 p-3 border-2 rounded-md'
                placeholder={placeholder}
                id={name}
                {...rest}
                {...field}
            />
            {fieldState?.error?.message && (
                <p className='text-sm font-medium text-destructive mt-1'>
                    {fieldState?.error?.message}
                </p>
            )}
        </div>
    )
}
