import { Role, User } from './auth'
import { AbstractTableField } from './shared'

export type ProJects = AbstractTableField & {
    name: string
    description: string
    key: string
    logo: string | null
    total_members: number
    // role: Role | null
}

export type ProjectMembers = {
    id: string
    user_id: string
    project_id: string
    role: Role
    user: User
    created_at: Date | null
    updated_at: Date | null
}

export type InvitedMembers = Omit<ProjectMembers, 'user'> & { email: string }

export type ProjectResourceTypes = {
    id: string
    name: string
    created_at: Date
    updated_at: Date
}

export type ProjectResource = {
    id: string
    project_id: string
    created_by: string
    last_updated_by: string
    title: string
    note: string | null
    resource_type: string
    type: ProjectResourceTypes
    lastUpdatedBy?: User
    createdBy: User
    created_at: Date
    updated_at: Date
}
