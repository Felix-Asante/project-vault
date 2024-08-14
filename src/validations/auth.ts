import { z } from 'zod'

export const invitationSchema = z.object({
    invitees: z
        .array(
            z.object({
                email: z.string().email(),
                role: z.string({ required_error: 'Role is required' }),
            })
        )
        .min(1),
})
