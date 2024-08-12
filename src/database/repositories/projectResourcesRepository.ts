import { db } from '@/database'
import { getErrorMessage } from '@/utils'
import { and, asc, eq, ilike } from 'drizzle-orm'

import { CreateProjectResDto, UpdateProjectDto } from '@/types/dtos/project.dto'

import {
    ProjectResourceTable,
    ProjectResourceTypeTable,
} from '../schemas/projects'
import authRepository from './authRepository'

type GetResourceQuery = {
    search?: string
    type?: string
}
class projectResourceRepository {
    async getAllProjectResources(projectId: string, query?: GetResourceQuery) {
        return await db.query.ProjectResourceTable.findMany({
            where: and(
                eq(ProjectResourceTable.project_id, projectId),
                query?.search
                    ? ilike(ProjectResourceTable.title, `%${query?.search}%`)
                    : undefined,
                query?.type
                    ? eq(ProjectResourceTable.resource_type, query?.type)
                    : undefined
            ),
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

    async getProjectResourceById(id: string) {
        try {
            const resource = await db.query.ProjectResourceTable.findFirst({
                where: eq(ProjectResourceTable.id, id),
                with: {
                    type: true,
                    createdBy: true,
                    lastUpdatedBy: true,
                },
            })
            return resource
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
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

    async deleteProjectResource(id: string) {
        try {
            await db
                .delete(ProjectResourceTable)
                .where(eq(ProjectResourceTable.id, id))
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    }
}

export default new projectResourceRepository()
