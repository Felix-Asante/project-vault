export type Query = {
    [key: string]: string
}

export type SubcriptionPlan = {
    id: string
    label: string
    created_at: Date
    updated_at: Date
    price: number
}

export type AbstractTableField = {
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    id: string
}
