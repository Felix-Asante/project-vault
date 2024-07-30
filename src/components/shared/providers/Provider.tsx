'use client'

import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Next13ProgressBar } from 'next13-progressbar'

const queryClient = new QueryClient()

type ProviderProps = PropsWithChildren<{}>

export default function Providers({ children }: ProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Next13ProgressBar height='2px' color='#22c55e' showOnShallow />
        </QueryClientProvider>
    )
}
