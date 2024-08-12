import Link from 'next/link'
import { getInitials } from '@/utils'
import { currentUser } from '@clerk/nextjs/server'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { FolderOpenDotIcon } from 'lucide-react'

import Button from '../shared/Button'
import { Avatar, AvatarImage } from '../ui/avatar'

export default async function MainHomeNavbar() {
    const user = await currentUser()
    const fullName =
        user?.fullName ??
        `${user?.firstName} ${user?.lastName} ` ??
        user?.firstName

    return (
        <header className='wrapper border-b sticky top-0 left-0 z-10 bg-background'>
            <nav className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Link href={'/'}>
                        <FolderOpenDotIcon className='w-6 h-6 text-primary' />
                    </Link>
                    <Link
                        href='/'
                        className='text-base xl:text-lg font-bold lowercase line-clamp-1 w-[90%]'
                    >
                        / {fullName}&apos;s Workspace
                    </Link>
                </div>
                <div className='flex items-center gap-3'>
                    <Button
                        variant='outline'
                        className='border-input rounded-[4px] text-gray-400 py-1.5 h-fit'
                    >
                        Feedback
                    </Button>
                    <Avatar className='w-8 h-8'>
                        <AvatarImage src={user?.imageUrl} alt='photo' />
                        <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                    </Avatar>
                </div>
            </nav>
        </header>
    )
}
