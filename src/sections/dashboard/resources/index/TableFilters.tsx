'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { capitalize } from '@/utils'
import { useRouter } from 'next13-progressbar'
import { useForm } from 'react-hook-form'

import { ProjectResourceTypes } from '@/types/projects'
import useQueryParams from '@/hooks/useQueryParams'
import Button from '@/components/shared/Button'
import SearchInput from '@/components/shared/inputs/SearchInput'
import SelectInput from '@/components/shared/inputs/SelectInput'

interface Props {
    resourceTypes: ProjectResourceTypes[]
}
export function TableFilters(props: Props) {
    const { resourceTypes } = props
    const { control, watch } = useForm()
    const { add, remove } = useQueryParams()
    const path = usePathname()
    const router = useRouter()
    const type = watch('resourceType')

    useEffect(() => {
        if (type) {
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
                options={resourceTypes.map((type) => ({
                    label: capitalize(type.name),
                    value: type.id,
                }))}
            />
            <Button
                variant={'ghost'}
                className='rounded-full text-destructive'
                onClick={() => router.push(path)}
            >
                Clear filters
            </Button>
        </div>
    )
}
