import MainHomeNavbar from '@/components/navbars/MainHomeNavbar'
import React from 'react'

export default function DashboardLayout({children}:{ children: React.ReactNode  }) {
  return (
    <div>
        <MainHomeNavbar />
        {children}
    </div>
  )
}
