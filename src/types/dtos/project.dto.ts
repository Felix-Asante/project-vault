import { z } from 'zod'

import { createProjectSchema } from '@/validations/projects'

export type CreateProjectDto = z.infer<typeof createProjectSchema>

export type CreateProjectResDto = {
    title: string
    type: string
    project: string
}

export type UpdateProjectDto = Partial<CreateProjectResDto>
