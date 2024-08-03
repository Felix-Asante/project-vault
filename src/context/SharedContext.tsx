import { createContext, PropsWithChildren, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import { User } from '@/types/auth'
import { ProjectResourceTypes } from '@/types/projects'
import { onGetProjectResourcesTypes } from '@/lib/actions/projectResources'
import { onGetUserByClerkId } from '@/lib/actions/users'

interface SharedContextValues {
    resourcesTypes: ProjectResourceTypes[]
    user?: User | null
    loading: boolean
}

const SharedContext = createContext<SharedContextValues>({
    resourcesTypes: [],
    user: null,
    loading: false,
})

export function useSharedContext() {
    if (!SharedContext) {
        throw new Error(
            'useSharedContext must be used within a SharedContextProvider'
        )
    }
    return useContext(SharedContext)
}

export function SharedContextProvider({ children }: PropsWithChildren) {
    const { data, isLoading } = useQuery({
        queryKey: ['getAllResourcesTypes'],
        queryFn: onGetProjectResourcesTypes,
    })
    const { data: results, isLoading: fetchingUser } = useQuery({
        queryKey: ['getCurrentUser'],
        queryFn: onGetUserByClerkId,
    })

    return (
        <SharedContext.Provider
            value={{
                resourcesTypes: data?.types ?? [],
                user: results?.user,
                loading: isLoading || fetchingUser,
            }}
        >
            {children}
        </SharedContext.Provider>
    )
}
