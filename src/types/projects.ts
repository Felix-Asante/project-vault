import { Role, User } from './auth'
import { AbstractTableField } from './shared'

export type ProJects = AbstractTableField & {
    name: string
    description: string
    key: string
    logo: string | null
    total_members: number
    role: Role | null
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
