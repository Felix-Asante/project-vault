'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectPermissions } from '@/constants/enum'
import { getErrorMessage } from '@/utils'
import { hasPassed48Hours } from '@/utils/formatDates'
import { format, formatDate } from 'date-fns'

import { InvitedMembers } from '@/types/projects'
import {
    onResendInvitation,
    onRevokeInvitation,
} from '@/lib/actions/invitations'
import { useServerActionMutation } from '@/hooks/server-action-hooks'
import { useToast } from '@/components/ui/use-toast'
import Button from '@/components/shared/Button'
import EmptyContent from '@/components/shared/ErrorContent'
import DeleteConfirmationModal from '@/components/shared/modals/DeleteConfirmationModal'

type Props = {
    members: InvitedMembers[]
}

enum InvitationActions {
    Resend = 'Resend',
    Revoke = 'Revoke',
}

export default function PendingUsersList(props: Props) {
    const { members } = props
    return (
        <div>
            {members.length === 0 ? (
                <EmptyContent title='You have no pending invitations at the moment.' />
            ) : (
                members.map((member) => <Row key={member.id} member={member} />)
            )}
        </div>
    )
}

function Row({ member }: { member: InvitedMembers }) {
    const hasPassed48h =
        member.created_at && hasPassed48Hours(member.created_at)

    const [selectedAction, setSelectedAction] = useState<
        keyof typeof InvitationActions | 'null'
    >('null')
    const { toast } = useToast()
    const router = useRouter()

    const resendInvitation = useServerActionMutation(onResendInvitation)
    const revokeInvitation = useServerActionMutation(onRevokeInvitation)

    const ActionConfirmationModal = {
        [InvitationActions.Resend]: () => (
            <DeleteConfirmationModal
                isOpen
                onClose={() => setSelectedAction('null')}
                onConfirm={handleResend}
                title='Resend invitation'
                description='Click continue to confirm'
                loading={resendInvitation.isPending}
            />
        ),
        [InvitationActions.Revoke]: () => (
            <DeleteConfirmationModal
                isOpen
                onClose={() => setSelectedAction('null')}
                onConfirm={handleRevoke}
                title='Revoke invitation'
                description='Click continue to confirm'
                loading={revokeInvitation.isPending}
            />
        ),
        null: () => null,
    }[selectedAction]

    const createPayload = () => ({
        invitationId: member.id,
        project: member.project_id,
        permission: ProjectPermissions.CAN_UPDATE_PROJECT_INVITATION,
    })

    const handleResend = async () => {
        try {
            const response = await resendInvitation.mutateAsync(createPayload())
            if (response?.error) {
                return toast({
                    description: response.error,
                    variant: 'destructive',
                })
            }

            setSelectedAction('null')

            toast({
                description: 'Invitation successfully sent',
            })
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                variant: 'destructive',
            })
        }
    }

    const handleRevoke = async () => {
        try {
            const response = await revokeInvitation.mutateAsync(createPayload())
            if (response?.error) {
                return toast({
                    description: response.error,
                    variant: 'destructive',
                })
            }
            setSelectedAction('null')
            router.refresh()
            toast({
                description: 'Invitation revoked successfully',
            })
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                variant: 'destructive',
            })
        }
    }

    return (
        <div className='p-4 border-t border-border'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-y-5'>
                <div>
                    <p className='text-sm 2xl:text-base'>{member.email}</p>
                    <p className='text-gray-500 text-sm  2xl:text-base'>
                        Assigned role: {member.role.label}
                    </p>
                </div>
                {member.created_at && (
                    <p className='text-sm  2xl:text-base text-left'>
                        Invitation sent:{' '}
                        {format(member.created_at, 'do MMM yyyy HH:mm')}
                    </p>
                )}

                <div className='flex items-center gap-3'>
                    <Button
                        onClick={() =>
                            setSelectedAction(InvitationActions.Resend)
                        }
                        className='text-sm 2xl:text-base text-white'
                    >
                        Resend
                    </Button>
                    {hasPassed48h && (
                        <Button
                            variant='destructive'
                            onClick={() =>
                                setSelectedAction(InvitationActions.Revoke)
                            }
                            className='text-sm 2xl:text-base'
                        >
                            Revoke
                        </Button>
                    )}
                </div>
            </div>
            <ActionConfirmationModal />
        </div>
    )
}
