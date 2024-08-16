import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import Providers from '@/components/shared/providers/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Project Vault',
    description: 'Project  management app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' className='dark'>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
