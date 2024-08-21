export type Query = {
    [key: string]: string
}

export type Paths = {
    name: string
    href: string
    current: boolean
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

export type PaginationMetaData = {
    currentPage: number
    limit: number
    totalPages: number
    totalCount: number
}

export type PaginationResult<T> = {
    items: T[]
    metadata: PaginationMetaData
}

export type PaginationOptions = {
    limit?: number
    page?: number
    search?: string
    sortBy?: string
}

export type ProcedureErrorActions = 'logout' | null

export type ProcedureError = {
    message: string
    action: ProcedureErrorActions
}
