import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function SignInPage() {
  return (
    <main className='flex items-center h-screen justify-center'>
      <SignIn />
    </main>
  )
}
