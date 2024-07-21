import { headers } from 'next/headers'
import { Env } from '@/utils/env'
import { WebhookEvent } from '@clerk/nextjs/server'
import { UserJSON } from '@clerk/types'
import { Webhook } from 'svix'
import { SUBSCRIPTION_PLANS } from '@/constants/enum'
import { onCreatedUser } from '@/lib/actions/users'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = Env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('WEBHOOK_SECRET not added')
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // error out,If there are no headers
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a  Svix instance.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
            status: 400,
        })
    }

    // add user to DB
    if (evt.type === 'user.created') {
        // @ts-ignore
        const userData = filterClerkData(evt.data)
       await onCreatedUser(userData)
        
    }

    if (evt.type === 'user.deleted' && evt.data.deleted) {
        // DELETE USER
    }
    return new Response('', { status: 200 })
}

export function filterClerkData(data: UserJSON) {
    const {
        first_name,
        last_name,
        id,
        image_url,
        profile_image_id,
        email_addresses,
        created_at,
        updated_at,
    } = data

    return {
        first_name,
        last_name,
        user_id: id,
        photo: image_url ?? profile_image_id,
        email: email_addresses[0].email_address,
        created_at: new Date(created_at),
        updated_at: new Date(updated_at),
        plan:SUBSCRIPTION_PLANS.BASIC
    }
}
