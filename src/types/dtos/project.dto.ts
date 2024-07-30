import { z } from 'zod'

import { createProjectSchema } from '@/validations/projects'

export type CreateProjectDto = z.infer<typeof createProjectSchema>
