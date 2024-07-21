import { createEnv } from '@t3-oss/env-nextjs'
import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: '.env.local' })

export const Env = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'test', 'production']),
        DATABASE_URL: z.string(),
        CLERK_SECRET_KEY: z.string(),
        CLERK_WEBHOOK_SECRET: z.string(),
        CLOUDINARY_CLOUD_NAME: z.string(),
        CLOUDINARY_SECRET: z.string(),
        CLOUDINARY_KEY: z.string(),
    },
    client: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
        NEXT_PUBLIC_IMAGE_BASE_URL: z.string(),
        NEXT_PUBLIC_CLOUDINARY_IMAGE_DOMAIN: z.string(),
        NEXT_PUBLIC_APP_URL: z.string(),
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
        CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        NEXT_PUBLIC_CLERK_SIGN_IN_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
        CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
        NEXT_PUBLIC_IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
        NEXT_PUBLIC_CLOUDINARY_IMAGE_DOMAIN:
            process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_DOMAIN,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    },
})

export function loadEnv() {
    dotenv.config({ path: '.env.local' })
}
