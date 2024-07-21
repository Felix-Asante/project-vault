import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'


import { Env } from './env'
import { Query } from '@/types/shared'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function toQuery(queryObj: Query) {
    if (!queryObj || !Object.keys(queryObj).length) return ''
    const queries: string[] = []
    Object.keys(queryObj).forEach((key) => {
        if (queryObj[key]) {
            queries.push(`${key}=${queryObj[key]}`)
        }
    })
    return `?${queries.join('&')}`
}

export const getErrorMessage = (
    error: unknown,
    defaultMessage: string = 'Something went wrong'
): string => {
    let message: string
    if (error instanceof Error) {
        message = error?.message
    } else if (error && typeof error === 'object' && 'message' in error) {
        message = String(error?.message)
    } else if (typeof error === 'string') {
        message = error
    } else {
        message = defaultMessage
    }

    return message
}
export function pluralize(
    text: string,
    total = 2,
    pluralForm?: string
): string {
    return total > 1 ? (pluralForm ? pluralForm : `${text}s`) : text
}

interface paths {
    name: string
    href: string
    current: boolean
}
export function parsePathname(pathname: string): paths[] {
    // Remove leading slash if present
    if (pathname.startsWith('/')) {
        pathname = pathname.slice(1)
    }

    // Split the pathname into parts based on slashes
    const parts = pathname.split('/')

    // Initialize an empty array to store the result
    const result: paths[] = []

    // Iterate through the parts and build the result array
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        if (part) {
            const href = '/' + parts.slice(0, i + 1).join('/')
            const current = i === parts.length - 1
            result.push({
                name: part,
                href,
                current,
            })
        }
    }

    return result.length ? result : [{ name: 'home', href: '/', current: true }]
}

export function getInitials(text: string): string {
    // Split the full name into an array of words
    const words = text.trim().split(/\s+/)

    const initials = words.map((word) => word[0].toUpperCase())

    return initials.join('')
}

export function getImageUrl(imageKey: string) {
    if (imageKey?.startsWith('http')) return imageKey
    return `${Env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageKey}`
}

export function formatNumber(num: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
    })

    return formatter.format(num)
}
