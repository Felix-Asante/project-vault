import React from 'react'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <main className='flex items-center h-screen justify-center'>
            <SignIn />
        </main>
    )
}
