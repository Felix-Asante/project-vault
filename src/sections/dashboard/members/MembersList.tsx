import { Role } from '@/types/auth'
import { InvitedMembers, ProjectMembers } from '@/types/projects'
import { PaginationResult } from '@/types/shared'
import SearchInput from '@/components/shared/inputs/SearchInput'

import MembersTable from '../projects/MembersTable'
import { MembersListHeader } from './MembersListHeader'
import PendingUsersList from './PendingUsersList'

type MembersListProps = {
    isPending: boolean
    members:
        | PaginationResult<InvitedMembers>
        | PaginationResult<ProjectMembers>
        | null
    roles: Role[]
}
export default function MembersList(props: MembersListProps) {
    const { members, roles, isPending } = props

    const users = members?.items ?? []
    return (
        <div className='mt-7'>
            <MembersListHeader isPending={isPending} />
            <div className='border border-border rounded-md py-3 mt-5'>
                <div className='px-3 pb-3'>
                    <SearchInput placeholder='Search for user' />
                </div>
                {!isPending ? (
                    <MembersTable
                        members={users as ProjectMembers[]}
                        roles={roles}
                    />
                ) : (
                    <PendingUsersList members={users as InvitedMembers[]} />
                )}
            </div>
        </div>
    )
}
