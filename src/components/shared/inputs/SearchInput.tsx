'use client'

import { useEffect, useState } from 'react'
import { LoaderIcon, SearchIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import useDebounce from '@/hooks/useDebounce'
import useQueryParams from '@/hooks/useQueryParams'
import { Input } from '@/components/ui/input'

type SearchInputProps = {
    placeholder?: string
}
export default function SearchInput(props: SearchInputProps) {
    const { ...inputProps } = props

    const { control, watch } = useForm()
    const [searching, setSearching] = useState(false)
    const { add, remove } = useQueryParams()

    const searchQuery = useDebounce(watch('search'), 500)

    useEffect(() => {
        if (searchQuery) {
            setSearching(true)
            add('search', searchQuery)
            setTimeout(() => setSearching(false), 400)
        } else {
            remove('search')
        }
    }, [searchQuery])

    return (
        <Controller
            name='search'
            control={control}
            render={({ field }) => (
                <Input
                    {...field}
                    {...inputProps}
                    className='bg-transparent'
                    startContent={
                        searching ? (
                            <LoaderIcon className='w-4 h-4 text-gray-700' />
                        ) : (
                            <SearchIcon className='w-4 h-4 text-gray-700' />
                        )
                    }
                />
            )}
        />
    )
}
