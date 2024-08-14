import React from 'react'

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'

interface FormInputProps extends InputProps {
    name: string
    control: any
    defaultValue?: string
    label?: string
    placeholder?: string
    description?: string
}
export default function FormInput(props: FormInputProps) {
    const { control, name, label, placeholder, description, ...inputProps } =
        props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            {...inputProps}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
