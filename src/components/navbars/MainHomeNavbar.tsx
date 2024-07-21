import { FolderOpenDotIcon } from 'lucide-react';
import Link from 'next/link';
import Button from '../shared/Button';
import { currentUser } from '@clerk/nextjs/server';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { getInitials } from '@/utils';

export default async function MainHomeNavbar() {
    const user = await currentUser()
    const fullName = user?.fullName?? `${user?.firstName} ${user?.lastName} `?? user?.firstName

  return (
    <header className='py-4 px-1 lg:p-4'>
        <nav className='container flex items-center justify-between'>
            <div className="flex items-center gap-2">
                <Link href={'/'}>
                    <FolderOpenDotIcon className="w-6 h-6 text-primary" />
                </Link>
                <h1 className="text-base xl:text-lg font-bold lowercase line-clamp-1 w-[90%]">/ {fullName}&apos;s Workspace</h1>
            </div>
            <div className="flex items-center gap-3">
                <Button variant='outline' className='border-gray-700 rounded-[4px] text-gray-400 py-1.5 h-fit'>Feedback</Button>
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={user?.imageUrl} alt='photo' />
                    <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    </header>
  )
}
