'use server'

import projectRepository from '@/database/repositories/projectRepository'
import { getErrorMessage } from '@/utils'
import { currentUser } from '@clerk/nextjs/server'

import { CreateProjectDto } from '@/types/dtos/project.dto'
import { Query } from '@/types/shared'

export async function onCreateProject(data: CreateProjectDto) {
    try {
        const user = await currentUser()
        if (!user) throw new Error('Forbidden access! Please login first')
        const project = await projectRepository.createProject(user?.id, data)

        return { error: null, project }
    } catch (error) {
        console.error('Error on project created', error)
        return { error: getErrorMessage(error), project: null }
    }
}
export async function onGetUserProjects(query?: Query) {
    try {
        const user = await currentUser()
        if (!user) throw new Error('Forbidden access! Please login first')
        const projects = await projectRepository.getUserProjects(
            user?.id,
            query
        )

        return { error: null, projects }
    } catch (error) {
        console.error('Error on project created', error)
        return { error: getErrorMessage(error), projects: [] }
    }
}
