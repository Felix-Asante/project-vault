import { Role } from './auth'
import { AbstractTableField } from './shared'

export type ProJects = AbstractTableField & {
    name: string
    description: string
    key: string
    logo: string | null
    total_members: number
    role: Role | null
}
