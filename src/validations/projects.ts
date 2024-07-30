import { z } from 'zod'

export const createProjectSchema = z.object({
    name: z.string({ required_error: 'Project name is required' }),
    description: z.string({
        required_error: 'Project description is required',
    }),
    logo: z.any().optional(),
})
