'use client'

import Image from 'next/image'
import { SignOutButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'

const illustration_empty_content = '/assets/images/no-data.png'

interface EmptyContentProps {
    title: string
    description?: string
    illustration?: any
    showLogout?: boolean
}

export default function EmptyContent({
    title,
    description,
    illustration,
    showLogout = false,
}: EmptyContentProps) {
    return (
        <div className='w-full flex text-center centers justify-center flex-col items-center py-6 '>
            {showLogout && (
                <div className='self-end mr-4'>
                    <SignOutButton>
                        <LogOutIcon size={20} className='text-destructive' />
                    </SignOutButton>
                </div>
            )}
            <Image
                width={240}
                height={100}
                alt='empty content'
                className='!h-[240px] aspect-square object-cover'
                src={illustration || illustration_empty_content}
            />
            <h1 className='font-medium text-xl'>{title}</h1>
            {description && (
                <p
                    className='
        text-gray-700 text-sm '
                >
                    {description}
                </p>
            )}
        </div>
    )
}
