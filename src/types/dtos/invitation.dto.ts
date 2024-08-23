import { User } from '../auth'
import { ProJects } from '../projects'

export type SendInvitationDto = {
    email: string
    role: string
    project: string
    invited_by: string
}

export type SendInvitationEmailDto = {
    invitedBy: User
    invitedUserEmail: string
    project: ProJects
    invitationKey: string
}
