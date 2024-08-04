'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { capitalize } from '@/utils'
import { useRouter } from 'next13-progressbar'
import { useForm } from 'react-hook-form'

import { ProjectResourceTypes } from '@/types/projects'
import useQueryParams from '@/hooks/useQueryParams'
import SearchInput from '@/components/shared/inputs/SearchInput'
import SelectInput from '@/components/shared/inputs/SelectInput'

interface Props {
    resourceTypes: ProjectResourceTypes[]
}
export function TableFilters(props: Props) {
    const { resourceTypes } = props
    const { control, watch } = useForm()
    const { add, remove } = useQueryParams()

    const type = watch('resourceType')

    const types = [
        { value: 'All', label: 'All' },
        ...resourceTypes.map((type) => ({
            label: capitalize(type.name),
            value: type.id,
        })),
    ]

    useEffect(() => {
        if (type && type.toLowerCase() !== 'all') {
            add('type', type)
        } else {
            remove('type')
        }
    }, [type])

    return (
        <div className='flex items-center gap-5'>
            <div>
                <SearchInput placeholder='Search' />
            </div>
            <SelectInput
                name='resourceType'
                placeholder='Filter by type'
                control={control}
                options={types}
            />
        </div>
    )
}
