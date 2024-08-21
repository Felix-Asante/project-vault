import { z } from 'zod'

export const permissionsSchema = z.object({
    permission: z.string(),
    project: z.string(),
})
