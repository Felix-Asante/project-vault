'use client'

import { PropsWithChildren } from 'react'
import { SharedContextProvider } from '@/context/SharedContext'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Next13ProgressBar } from 'next13-progressbar'

import { Toaster } from '@/components/ui/toaster'

const queryClient = new QueryClient()

type ProviderProps = PropsWithChildren<{}>

export default function Providers({ children }: ProviderProps) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {
                    colorPrimary: '#22c55e',
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <SharedContextProvider>{children}</SharedContextProvider>
                <Next13ProgressBar height='2px' color='#22c55e' showOnShallow />
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster />
            </QueryClientProvider>
        </ClerkProvider>
    )
}
