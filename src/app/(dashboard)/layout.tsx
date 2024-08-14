import React from 'react'

import MainHomeNavbar from '@/components/navbars/MainHomeNavbar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <MainHomeNavbar />
            {children}
        </div>
    )
}
