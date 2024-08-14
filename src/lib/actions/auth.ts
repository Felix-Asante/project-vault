'use server'

import authRepository from '@/database/repositories/authRepository'
import { getErrorMessage } from '@/utils'

export async function onGetAllRoles() {
    try {
        const roles = await authRepository.getAllRoles()
        return { error: null, roles }
    } catch (error) {
        console.error({ error })
        return { error: getErrorMessage(error), roles: [] }
    }
}
