import { z } from 'zod'

export const createProjectSchema = z.object({
    name: z
        .string({ required_error: 'Project name is required' })
        .max(30, { message: 'Project name should not exceed 30 characters' }),
    description: z
        .string({
            required_error: 'Project description is required',
        })
        .max(200, {
            message: 'Project description should not exceed 200 characters',
        }),
    // logo: z.any().optional(),
})
