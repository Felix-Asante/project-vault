import { z } from 'zod'

import { invitationSchema } from '@/validations/auth'

export type InvitationDto = z.infer<typeof invitationSchema>
