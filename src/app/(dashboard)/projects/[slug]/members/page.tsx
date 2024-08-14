import React from 'react'
import { redirect } from 'next/navigation'
import MembersHeaders from '@/sections/dashboard/members/MembersHeaders'
import MembersList from '@/sections/dashboard/members/MembersList'

import { onGetAllRoles } from '@/lib/actions/auth'
import { onGetProjectMembers, onGetProjectsByKey } from '@/lib/actions/projects'

type PageProps = {
    params: {
        slug: string
    }
    searchParams: {
        search: string
        type: string
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

    return (
        <div className='py-5 px-4'>
            <MembersHeaders />
            <MembersList members={members} roles={roles} />
        </div>
    )
}
