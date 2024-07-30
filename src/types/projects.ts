import { AbstractTableField } from './shared'

export type ProJects = AbstractTableField & {
    name: string
    description: string
    logo: string | null
    total_members: number
}
