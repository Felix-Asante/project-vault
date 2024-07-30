import React from 'react'
import Link from 'next/link'
import { PROJECT_NAVIGATION } from '@/constants/navs'

import { buttonVariants } from '@/components/ui/button'

type Props = {
    children: React.ReactNode
    params: {
        slug: string
    }
}
export default function layout({ children, params }: Props) {
    //  check if the user has the right permission to view the project
    return (
        <div>
            <aside className='hidden md:flex flex-col gap-y-2 fixed top-[4.15rem] left-0 w-56 border-r p-5 h-screen max-h-screen pt-7'>
                {PROJECT_NAVIGATION.map((nav) => (
                    <Link
                        href={nav.path(params.slug)}
                        className={buttonVariants({
                            variant: 'ghost',
                            className: 'gap-4 w-full !justify-start',
                        })}
                    >
                        <nav.icon className='w-5 h-5' />
                        <span className='capitalize'>{nav.label}</span>
                    </Link>
                ))}
            </aside>
            <div className='md:pl-[16rem] md:pr-8 px-4 pt-5 '>{children}</div>
        </div>
    )
}
