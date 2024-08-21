import { redirect } from 'next/navigation'

import { ProcedureError } from '@/types/shared'

export function handleProcedureErrors(error: ProcedureError) {
    if (error?.action === 'logout') {
        return redirect('/sign-in')
    }

    if (error?.message) {
        return { error: error.message }
    }

    return { error: 'something went wrong. Please try again.' }
}
