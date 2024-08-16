'use client'

import { cn } from '@/utils'
import { LinkIcon } from 'lucide-react'

import useQueryParams from '@/hooks/useQueryParams'
import Button from '@/components/shared/Button'

enum TabKeys {
    member = 'member',
    pending = 'pending',
}
const Tabs = [
    {
        label: 'Team members',
        key: TabKeys.member,
    },
    {
        label: 'Pending invitations',
        key: TabKeys.pending,
    },
]
type MembersHeaderProps = {
    isPending: boolean
}
export function MembersListHeader(props: MembersHeaderProps) {
    const { isPending } = props
    const { add, remove } = useQueryParams()

    const clickHandlers = {
        [TabKeys.pending]: () => add('status', TabKeys.pending),
        [TabKeys.member]: () => remove('status'),
    }
    const onClickHandler = (key: keyof typeof TabKeys) => {
        const handler = clickHandlers[key]
        handler?.()
    }

    const tabClass = (key: string) =>
        (isPending && key === 'pending') || (!isPending && key === 'member')
            ? 'text-white border-b border-white'
            : ''

    return (
        <div className='flex  justify-between border-b border-border'>
            <div className='flex items-center gap-4'>
                {Tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onClickHandler(tab.key)}
                        className={cn(
                            'text-gray-400 font-light hover:text-white block h-full pb-2',
                            tabClass(tab.key)
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* <Button
                variant={'outline'}
                disabled
                className='bg-accent/50 gap-x-2 block mb-2 cursor-not-allowed'
            >
                <div className='flex gap-2 items-center'>
                    <LinkIcon className='w-4 h-4' />
                    <span>Copy invitation link</span>
                </div>
            </Button> */}
        </div>
    )
}
