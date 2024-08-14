import React from 'react'
import { cn } from '@/utils'
import { LinkIcon } from 'lucide-react'

import { Role } from '@/types/auth'
import { ProjectMembers } from '@/types/projects'
import { PaginationResult } from '@/types/shared'
import Button from '@/components/shared/Button'
import SearchInput from '@/components/shared/inputs/SearchInput'

import MembersTable from '../projects/MembersTable'

const Tabs = [
    {
        label: 'Team members',
        key: 'member',
    },
    {
        label: 'Pending invitations',
        key: 'pending',
    },
]

type MembersListProps = {
    members: PaginationResult<ProjectMembers> | null
    roles: Role[]
}
export default function MembersList(props: MembersListProps) {
    const { members, roles } = props
    return (
        <div className='mt-7'>
            <div className='flex  justify-between border-b border-border pb-2'>
                <div className='flex items-center gap-4'>
                    {Tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={cn(
                                'text-gray-400 font-light hover:text-white'
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <Button variant={'outline'} className='bg-accent/50 gap-x-2'>
                    <LinkIcon className='w-4 h-4' />
                    <span>Invite Link</span>
                </Button>
            </div>
            <div className='border border-border rounded-md py-3 mt-5'>
                <div className='px-3 pb-3'>
                    <SearchInput placeholder='Search for user' />
                </div>
                <MembersTable members={members?.items ?? []} roles={roles} />
            </div>
        </div>
    )
}
