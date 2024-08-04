'use server'

import projectResourcesRepository from '@/database/repositories/projectResourcesRepository'
import { getErrorMessage } from '@/utils'

import { CreateProjectResDto, UpdateProjectDto } from '@/types/dtos/project.dto'
import { Query } from '@/types/shared'

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
export async function onGetAllProjectResources(project: string, query?: Query) {
    try {
        const resources =
            await projectResourcesRepository.getAllProjectResources(
                project,
                query
            )
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

export async function onUpdateProjectResource(
    id: string,
    data: UpdateProjectDto
) {
    try {
        await projectResourcesRepository.updateProjectResource(id, data)
        return { error: null }
    } catch (error) {
        console.error({ error })
        return { error: getErrorMessage(error) }
    }
}

export async function onDeleteProjectResource(id: string) {
    try {
        await projectResourcesRepository.deleteProjectResource(id)
        return { error: null }
    } catch (error) {
        console.error({ error })
        return { error: getErrorMessage(error) }
    }
}
