import React from 'react'
import { redirect } from 'next/navigation'
import { INVITATION_STATUS } from '@/constants/enum'
import MembersHeaders from '@/sections/dashboard/members/MembersHeaders'
import MembersList from '@/sections/dashboard/members/MembersList'

import { ProjectMembers } from '@/types/projects'
import { PaginationResult } from '@/types/shared'
import { onGetAllRoles } from '@/lib/actions/auth'
import { onGetProjectMembers, onGetProjectsByKey } from '@/lib/actions/projects'

type PageProps = {
    params: {
        slug: string
    }
    searchParams: {
        search: string
        status: string
        role: string
        page: string
    }
}
export default async function Members(props: PageProps) {
    const { params, searchParams } = props
    const { project } = await onGetProjectsByKey(params.slug)

    if (!project) return redirect('/projects')

    const { members, error } = await onGetProjectMembers(
        project.id,
        searchParams
    )

    const { roles } = await onGetAllRoles()

    const isPending = searchParams?.status === INVITATION_STATUS.PENDING

    return (
        <div className='py-5 px-4'>
            <MembersHeaders roles={roles} project={project.id} />
            <MembersList
                members={members}
                roles={roles}
                isPending={isPending}
            />
        </div>
    )
}
