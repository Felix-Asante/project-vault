'use server'

import { getErrorMessage } from '@/utils'

export async function onCreateProject() {
    try {
    } catch (error) {
        console.error('Error on project created', error)
        return { error: getErrorMessage(error), project: null }
    }
}
