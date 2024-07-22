import React from 'react'
import DashboardHomeHeader from '@/sections/dashboard/home/header'
import ProjectsListSection from '@/sections/dashboard/home/ProjectsListSection'

export default function DashboardHome() {
    return (
        <div className='px-1 lg:px-4 mt-6'>
            <div className='container'>
                <DashboardHomeHeader />
                <ProjectsListSection />
            </div>
        </div>
    )
}
