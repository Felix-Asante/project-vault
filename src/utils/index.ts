import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Query } from '@/types/shared'

import { Env } from './env'

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

export function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
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

export function getRandomNumbers(length: number): string {
    if (length <= 1) {
        throw new Error('Length must be greater than 1')
    }

    let randomNumber = ''
    for (let i = 0; i < length; i++) {
        randomNumber += Math.floor(Math.random() * 10).toString()
    }

    return randomNumber
}

export function generateRandomString(length: number = 32): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomIndex)
    }

    return result
}
