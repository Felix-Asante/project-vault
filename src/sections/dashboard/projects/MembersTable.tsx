'use client'

import { getInitials } from '@/utils'
import { useForm } from 'react-hook-form'

import { Role } from '@/types/auth'
import { ProjectMembers } from '@/types/projects'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from '@/components/shared/Button'
import SelectInput from '@/components/shared/inputs/SelectInput'

type Props = {
    members: ProjectMembers[]
    roles: Role[]
}
export default function MembersTable(props: Props) {
    const { members, roles } = props

    return (
        <div>
            {members.map((member) => (
                <Row key={member.id} member={member} roles={roles ?? []} />
            ))}
        </div>
    )
}

type RowProps = {
    member: ProjectMembers
    roles: Role[]
}

function Row(props: RowProps) {
    const { member, roles } = props
    const { control, watch } = useForm()

    const name = `member-${member.id}`

    const showUpdateBtn = watch(name) && member.role?.id !== watch(name)
    return (
        <div className='p-4 border-t border-border'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-y-5'>
                <div className='flex items-center gap-2'>
                    {' '}
                    <Avatar className='w-8 h-8'>
                        <AvatarImage src={member.user.photo} />
                        <AvatarFallback>
                            {getInitials(member.user.first_name)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-sm'>
                            {member.user.first_name} {member.user.last_name}
                        </p>
                        <p className='text-gray-500 text-sm'>
                            {member.user.email}
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <SelectInput
                        control={control}
                        name={name}
                        options={roles.map((role) => ({
                            label: role.label,
                            value: role.id,
                        }))}
                        defaultValue={member?.role?.id}
                    />
                    {showUpdateBtn && (
                        <Button variant='secondary'>Update</Button>
                    )}
                </div>
            </div>
        </div>
    )
}
