import Image from 'next/image'
import Link from 'next/link'
import MembersTable from '@/sections/dashboard/projects/MembersTable'
import { formatDistance } from 'date-fns'
import { MoveRightIcon, MoveUpRightIcon } from 'lucide-react'

import { onGetAllRoles } from '@/lib/actions/auth'
import { onGetProjectMembers, onGetProjectsByKey } from '@/lib/actions/projects'
import { buttonVariants } from '@/components/ui/button'
import EmptyContent from '@/components/shared/ErrorContent'

type PageProps = {
    params: {
        slug: string
    }
}
export default async function ProjectOverview(props: PageProps) {
    const { params } = props
    const { project, error } = await onGetProjectsByKey(params.slug)

    if (error || !project)
        return <EmptyContent title='Something went wrong' description={error} />

    const { members, error: membersError } = await onGetProjectMembers(
        project.id
    )

    const { roles } = await onGetAllRoles()

    return (
        <div>
            <section className='py-3'>
                <div className='flex justify-between items-center mb-2'>
                    <div className='flex items-center gap-4 lg:gap-6 w-[90%]'>
                        <Image
                            src={'/assets/images/logo.png'}
                            width={50}
                            height={50}
                            alt={`${project.name}-logo`}
                            unoptimized
                            className='w-10 h-10 md:w-[50px] md:h-[50px] object-contain'
                        />
                        <div className='w-[80%]'>
                            <p className='text-lg xl:text-xl font-semibold'>
                                {project.name}
                            </p>
                        </div>
                    </div>
                    <Link
                        href='/'
                        target='_blank'
                        className={buttonVariants({
                            className: 'bg-white gap-1 hover:bg-slate-200',
                        })}
                    >
                        <span>Visit</span>
                        <MoveUpRightIcon className='w-4 h-4' />
                    </Link>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:divide-x mt-6 md:mt-4'>
                    <div className='text-sm'>
                        <span className='text-primary'>Created: </span>
                        <span>
                            {formatDistance(new Date(), project.created_at)} by
                            Felix Asante
                        </span>
                    </div>
                    <div className='text-sm sm:pl-2'>
                        <span className='text-primary'>Modified: </span>
                        <span>
                            {formatDistance(new Date(), project.created_at)} by
                            Felix Asante
                        </span>
                    </div>
                </div>
            </section>

            <section className='border border-border rounded-md mt-8'>
                <div className='border-b border-border'>
                    <h2 className='text-xl font-semibold p-4 py-2.5'>
                        Members
                    </h2>
                    <MembersTable
                        members={members?.items ?? []}
                        roles={roles}
                    />
                </div>
                <div className='p-2'>
                    <Link
                        href={`/projects/${project.key}/members`}
                        className='hover:underline hover:text-slate-100 text-sm text-gray-500 flex items-center'
                    >
                        <span>Manage members</span>
                        <MoveRightIcon className='w-4 h-4 ml-2' />
                    </Link>
                </div>
            </section>
        </div>
    )
}
