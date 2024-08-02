import { capitalize } from '@/utils'

import { Paths } from '@/types/shared'

export function parsePathname(pathname: string): Paths[] {
    if (pathname.startsWith('/')) {
        pathname = pathname.slice(1)
    }

    const parts = pathname.split('/')

    const result: Paths[] = []

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        if (part) {
            const href = '/' + parts.slice(0, i + 1).join('/')
            const current = i === parts.length - 1
            result.push({
                name: capitalize(part),
                href,
                current,
            })
        }
    }

    return result.length ? result : [{ name: 'Home', href: '/', current: true }]
}
