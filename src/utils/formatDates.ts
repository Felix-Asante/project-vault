import { differenceInBusinessDays, isDate } from 'date-fns'

export function hasPassed48Hours(date: Date): boolean {
    if (!isDate(date)) throw new Error('Invalid date')
    return differenceInBusinessDays(new Date(), new Date(date)) >= 2
}
