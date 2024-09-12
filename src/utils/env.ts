import { createEnv } from '@t3-oss/env-nextjs'
import dotenv from 'dotenv'
import { z } from 'zod'

const envPath =
    process.env.NODE_ENV === 'test' ? 'env.test.local' : '.env.local'

dotenv.config({ path: envPath })

export const Env = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'test', 'production']),
        DATABASE_URL: z.string(),
        CLERK_SECRET_KEY: z.string(),
        CLERK_WEBHOOK_SECRET: z.string(),
        CLOUDINARY_CLOUD_NAME: z.string(),
        CLOUDINARY_SECRET: z.string(),
        CLOUDINARY_KEY: z.string(),
        RESEND_API_KEY: z.string(),
        TEST_EMAIL: z.string(),
    },
    client: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
        NEXT_PUBLIC_IMAGE_BASE_URL: z.string(),
        NEXT_PUBLIC_CLOUDINARY_IMAGE_DOMAIN: z.string(),
        NEXT_PUBLIC_APP_URL: z.string(),
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
        NEXT_PUBLIC_VERCEL_URL: z.string(),
        NEXT_PUBLIC_EMAIL_SENDER: z.string(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
        CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        TEST_EMAIL: process.env.TEST_EMAIL,
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
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
        NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
        NEXT_PUBLIC_EMAIL_SENDER: process.env.NEXT_PUBLIC_EMAIL_SENDER,
    },
})

export function loadEnv() {
    dotenv.config({ path: '.env.local' })
}
