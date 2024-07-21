import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function SignUpPage() {
  return (
    <main className='flex items-center h-screen justify-center'>
      <SignUp />
    </main>
  )
}
