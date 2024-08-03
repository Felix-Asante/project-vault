import { useController } from 'react-hook-form'

import { Label } from '../../ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../ui/select'

interface Options {
    label: string
    value: string
    id?: string
}
interface Props {
    name: string
    control: any
    label?: string
    defaultValue?: string
    placeholder?: string
    options: Options[]
}

function sortOptions(options: Options[]) {
    return options.sort((a, b) =>
        a.label?.localeCompare(b.label, undefined, {
            sensitivity: 'base',
            usage: 'sort',
        })
    )
}
export default function SelectInput({
    name,
    control,
    label,
    placeholder,
    options,
    defaultValue,
}: Props) {
    const { field, fieldState } = useController({ name, control, defaultValue })

    return (
        <div>
            {label && <Label className='block mb-1.5'>{label}</Label>}
            <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
            >
                <SelectTrigger>
                    <SelectValue
                        placeholder={placeholder ?? 'Select an option'}
                    />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions(options)?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option?.id ? `(${option?.id})` : ''} {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {fieldState?.error?.message && (
                <p className='text-sm font-medium text-destructive'>
                    {fieldState?.error?.message}
                </p>
            )}
        </div>
    )
}
