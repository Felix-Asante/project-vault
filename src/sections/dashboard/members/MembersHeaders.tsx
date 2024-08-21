'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectPermissions, Roles } from '@/constants/enum'
import { useSharedContext } from '@/context/SharedContext'
import { getErrorMessage } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import {
    CirclePlusIcon,
    SendIcon,
    Trash2Icon,
    UserRoundPlusIcon,
} from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import { useServerAction } from 'zsa-react'

import { Role } from '@/types/auth'
import { InvitationDto } from '@/types/dtos/auth.dto'
import { invitationSchema } from '@/validations/auth'
import {
    onGetAllProjectInvitations,
    onSendProjectInvitation,
} from '@/lib/actions/invitations'
import { useServerActionMutation } from '@/hooks/server-action-hooks'
import { useFormValidation } from '@/hooks/useFormValidation'
import { Form } from '@/components/ui/form'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import Button from '@/components/shared/Button'
import FormInput from '@/components/shared/inputs/FormInput'
import SelectInput from '@/components/shared/inputs/SelectInput'

type MembersHeadersProps = {
    roles: Role[]
    project: string
}
export default function MembersHeaders(props: MembersHeadersProps) {
    const { roles, project } = props
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Members</h1>
                <p className='mt-1 font-light'>
                    Manage team members and invitations
                </p>
            </div>
            <Button
                className='text-white font-semibold gap-2'
                onClick={() => setIsOpen(true)}
            >
                <UserRoundPlusIcon className='w-4 h-4' />
                <span>Add member</span>
            </Button>
            <AddMemberSheet
                roles={roles}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                project={project}
            />
        </div>
    )
}

interface AddMemberSheetProps {
    isOpen: boolean
    onClose: () => void
    roles: Role[]
    project: string
}

function AddMemberSheet(props: AddMemberSheetProps) {
    const { isOpen, onClose, roles, project } = props

    const form = useFormValidation<InvitationDto>({ schema: invitationSchema })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'invitees',
    })

    const { toast } = useToast()
    const { user } = useSharedContext()
    const router = useRouter()
    const { isPending, mutateAsync } = useServerActionMutation(
        onSendProjectInvitation
    )

    const removeSentInvitations = (
        sentInvitations: { error: string | null }[]
    ) => {
        sentInvitations.forEach((invitee, index) => {
            if (!invitee?.error) {
                remove(index)
            } else {
                toast({
                    description: invitee.error,
                    variant: 'destructive',
                })
            }
        })
    }

    const handleSubmit = async (data: InvitationDto) => {
        try {
            if (!user) {
                return toast({
                    description: 'Please sign in to invite members',
                    variant: 'destructive',
                })
            }
            const invitations = data.invitees.filter(
                (invitee) => invitee.email && invitee.role
            )

            if (invitations.length === 0) {
                return toast({
                    description: 'Please invite  at least one member',
                    variant: 'destructive',
                })
            }

            const sentInvitations = await Promise.all(
                invitations.map((invitee) =>
                    mutateAsync({
                        project,
                        ...invitee,
                        permission: ProjectPermissions.CAN_SEND_INVITATION,
                    })
                )
            )

            if (sentInvitations.some((invitee) => invitee?.error !== null)) {
                // did not filter cos i don't want to mistakenly delete an invitation which was sent successfully
                return removeSentInvitations(sentInvitations)
            }

            form.reset()
            remove()
            onClose()
            router.refresh()
            toast({
                description: 'Invitations sent successfully',
            })
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                variant: 'destructive',
            })
        }
    }

    return (
        <Sheet onOpenChange={onClose} open={isOpen}>
            <SheetContent
                onInteractOutside={(e) => e.preventDefault()}
                className='sm:max-w-[80%] w-full lg:w-1/2'
            >
                <SheetHeader>
                    <SheetTitle>Invite Members</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form className='mt-7 flex flex-col gap-4'>
                        {fields.map((field, index) => (
                            <div className='flex gap-4' key={field.id}>
                                <div className='flex-1'>
                                    <FormInput
                                        control={form.control}
                                        name={`invitees.${index}.email`}
                                        placeholder='user@example.com'
                                        type='email'
                                    />
                                </div>
                                <div className='flex-1'>
                                    <SelectInput
                                        name={`invitees.${index}.role`}
                                        defaultValue={
                                            roles.find(
                                                (role) =>
                                                    role.label === Roles.MEMBER
                                            )?.id
                                        }
                                        control={form.control}
                                        options={roles.map((role) => ({
                                            label: role.label,
                                            value: role.id,
                                            disabled:
                                                role.label === Roles.OWNER,
                                        }))}
                                        placeholder='Choose role'
                                    />
                                </div>
                                <Button
                                    variant='ghost'
                                    type='button'
                                    onClick={() => remove(index)}
                                >
                                    <Trash2Icon className='w-4 h-4' />
                                </Button>
                            </div>
                        ))}
                    </form>
                </Form>
                <div className='flex items-center gap-4 mt-5'>
                    <Button
                        variant='secondary'
                        className='gap-3'
                        onClick={() =>
                            append({
                                email: '',
                                role:
                                    roles.find(
                                        (role) => role.label === Roles.MEMBER
                                    )?.id ?? '',
                            })
                        }
                        type='button'
                        disabled={isPending}
                    >
                        <CirclePlusIcon className='w-4 h-4' />
                        <span>Add more</span>
                    </Button>
                    <Button
                        variant='secondary'
                        className='gap-3'
                        onClick={form.handleSubmit(handleSubmit)}
                        type='button'
                        disabled={fields.length === 0}
                        loading={isPending}
                    >
                        <SendIcon className='w-4 h-4' />
                        <span>Send invitation</span>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
