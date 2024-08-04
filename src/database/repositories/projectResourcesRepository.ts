import { db } from '@/database'
import { getErrorMessage } from '@/utils'
import { asc, eq } from 'drizzle-orm'

import { CreateProjectResDto, UpdateProjectDto } from '@/types/dtos/project.dto'

import {
    ProjectResourceTable,
    ProjectResourceTypeTable,
} from '../schemas/projects'
import authRepository from './authRepository'

class projectResourceRepository {
    async getAllProjectResources(projectId: string) {
        return await db.query.ProjectResourceTable.findMany({
            where: eq(ProjectResourceTable.project_id, projectId),
            with: {
                type: true,
                createdBy: true,
                lastUpdatedBy: true,
            },
            orderBy: asc(ProjectResourceTable.created_at),
        })
    }

    async getAllProjectResourceTypes() {
        return await db.query.ProjectResourceTypeTable.findMany()
    }

    async getProjectResourceTypeById(id: string) {
        try {
            const type = await db.query.ProjectResourceTypeTable.findFirst({
                where: eq(ProjectResourceTypeTable.id, id),
            })
            return type
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    }

    async createProjectResource(data: CreateProjectResDto) {
        try {
            const { title, type, project } = data
            const resourceType = await this.getProjectResourceTypeById(type)
            const user = await authRepository.getCurrentUser()

            if (!resourceType) throw new Error('Invalid project resource type')
            if (!user) throw new Error('Forbidden access! Please login first')

            return await db
                .insert(ProjectResourceTable)
                .values({
                    title,
                    created_by: user.id,
                    last_updated_by: user.id,
                    resource_type: type,
                    project_id: project,
                })
                .returning()
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    }

    async updateProjectResource(id: string, data: UpdateProjectDto) {
        try {
            const user = await authRepository.getCurrentUser()

            if (!user) throw new Error('Forbidden access! Please login first')

            await db
                .update(ProjectResourceTable)
                .set({
                    ...data,
                    last_updated_by: user.id,
                    updated_at: new Date(),
                })
                .where(eq(ProjectResourceTable.id, id))
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    }
}

export default new projectResourceRepository()
