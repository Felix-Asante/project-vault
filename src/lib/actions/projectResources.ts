'use server'

import projectResourcesRepository from '@/database/repositories/projectResourcesRepository'
import { getErrorMessage } from '@/utils'

import { CreateProjectResDto } from '@/types/dtos/project.dto'

export async function onGetProjectResourcesTypes() {
    try {
        const types =
            await projectResourcesRepository.getAllProjectResourceTypes()
        return { error: null, types }
    } catch (error) {
        console.error({ error })
        return { error: getErrorMessage(error), types: [] }
    }
}
export async function onGetAllProjectResources(project: string) {
    try {
        const resources =
            await projectResourcesRepository.getAllProjectResources(project)
        return { error: null, resources }
    } catch (error) {
        console.error({ error })
        return { error: getErrorMessage(error), resources: [] }
    }
}
export async function onCreateProjectResource(data: CreateProjectResDto) {
    try {
        const resource =
            await projectResourcesRepository.createProjectResource(data)
        return { error: null, resource }
    } catch (error) {
        console.error({ error })
        return { error: getErrorMessage(error), resource: [] }
    }
}
