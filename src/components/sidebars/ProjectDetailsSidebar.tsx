'use client'

import React from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { PROJECT_NAVIGATION } from '@/constants/navs'
import { cn } from '@/utils'
import { parsePathname } from '@/utils/url'

import { buttonVariants } from '../ui/button'

export default function ProjectDetailsSidebar() {
    const params = useParams()
    const path = parsePathname(usePathname())[2].name

    return (
        <>
            {PROJECT_NAVIGATION.map((nav) => {
                const pathname = nav.path(params.slug as string)
                return (
                    <Link
                        key={nav.label}
                        href={pathname}
                        className={buttonVariants({
                            variant: 'ghost',
                            className: cn(
                                'gap-4 w-full !justify-start',
                                pathname.includes(path.toLowerCase())
                                    ? 'bg-accent'
                                    : ''
                            ),
                        })}
                    >
                        <nav.icon className='w-5 h-5' />
                        <span className='capitalize'>{nav.label}</span>
                    </Link>
                )
            })}
        </>
    )
}
