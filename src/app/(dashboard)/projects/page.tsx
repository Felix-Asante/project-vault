import React from 'react'
import DashboardHomeHeader from '@/sections/dashboard/home/header'
import ProjectsListSection from '@/sections/dashboard/home/ProjectsListSection'

import { Query } from '@/types/shared'

interface PageProps {
    searchParams: Query
}
export default function DashboardHome(props: PageProps) {
    const { searchParams } = props

    return (
        <div className='wrapper mt-6'>
            <DashboardHomeHeader />
            <ProjectsListSection query={searchParams} />
        </div>
    )
}
