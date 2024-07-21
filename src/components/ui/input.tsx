import * as React from 'react'
import { cn } from '@/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    startContent?: React.ReactNode
    endContent?: React.ReactNode
    wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            disabled = false,
            endContent,
            startContent,
            wrapperClassName = '',
            ...props
        },
        ref
    ) => {
        return (
            <div
                className={cn(
                    'flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                    disabled && 'cursor-not-allowed opacity-50',
                    wrapperClassName
                )}
            >
                {startContent && <div className='mr-3'>{startContent}</div>}
                <input
                    type={type}
                    className={cn(
                        'w-full outline-none disabled:cursor-not-allowed disabled:bg-transparent bg-background/40',
                        className
                    )}
                    ref={ref}
                    {...props}
                    disabled={disabled}
                />
                {endContent && <div className='ml-3 flex-1'>{endContent}</div>}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
