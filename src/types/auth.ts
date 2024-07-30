export type User = {
    id: string
    last_name: string
    first_name: string
    photo: string
    email: string
    user_id: string
    created_at: Date
    updated_at: Date
    plan: string
    slug: string
}

export type Role = {
    id: string
    created_at: Date | null
    updated_at: Date | null
    label: string
    permissions: string[]
}
