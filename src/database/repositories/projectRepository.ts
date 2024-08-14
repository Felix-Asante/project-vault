import { Member_Owner_Permission } from '@/constants/data'
import { Roles } from '@/constants/enum'
import { db } from '@/database'
import { generateRandomString, getErrorMessage } from '@/utils'
import { and, eq, ilike, or, sql } from 'drizzle-orm'

import { CreateProjectDto } from '@/types/dtos/project.dto'
import { ProJects } from '@/types/projects'
import { Query } from '@/types/shared'

import { RolesTable } from '../schemas/auth'
import { ProjectMembersTable, ProjectTable } from '../schemas/projects'
import { UserTable } from '../schemas/users'
import authRepository from './authRepository'
import usersRepository from './usersRepository'

type GetProjectMembersOptions = {
    limit?: number
    page?: number
    search?: string
    sortBy?: string
}
class ProjectsRepository {
    async createProject(userId: string, data: CreateProjectDto) {
        try {
            const user = await usersRepository.getUserByClerkId(userId)
            if (!user) throw new Error('User not found')

            let role: any = undefined
            role = await authRepository.getRoleByLabel(Roles.OWNER)

            if (!role) {
                role = await authRepository.createRole({
                    label: Roles.OWNER,
                    permissions: Member_Owner_Permission,
                })
            }

            return db.transaction(async (trx) => {
                const [project] = await trx
                    .insert(ProjectTable)
                    .values({ ...data, key: generateRandomString(32) })
                    .returning()
                await trx.insert(ProjectMembersTable).values({
                    project_id: project.id,
                    user_id: user.id,
                    role: role.id,
                })
                return project
            })
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    }

    async searchProjects(userId: string, query: Query) {
        try {
            const userProjects = await db
                .select(this.getProjectFields())
                .from(ProjectTable)
                .innerJoin(
                    ProjectMembersTable,
                    eq(ProjectTable.id, ProjectMembersTable.project_id)
                )
                .leftJoin(
                    RolesTable,
                    eq(ProjectMembersTable.role, RolesTable.id)
                )
                .where(
                    and(
                        eq(ProjectMembersTable.user_id, userId),
                        ilike(ProjectTable.name, `%${query.search || ''}%`)
                    )
                )
                .execute()
            return userProjects
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    }

    async getUserProjects(userId: string, query?: Query) {
        try {
            const user = await usersRepository.getUserByClerkId(userId)
            if (!user) throw new Error('User not found')

            if (query) {
                return await this.searchProjects(user.id, query)
            }

            const userProjects = await db
                .select(this.getProjectFields())
                .from(ProjectTable)
                .innerJoin(
                    ProjectMembersTable,
                    eq(ProjectTable.id, ProjectMembersTable.project_id)
                )
                .leftJoin(
                    RolesTable,
                    eq(ProjectMembersTable.role, RolesTable.id)
                )
                .where(eq(ProjectMembersTable.user_id, user.id))
                .execute()

            return userProjects
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    }

    async getProjectByKey(key: string) {
        try {
            const project = await db.query.ProjectTable.findFirst({
                where: eq(ProjectTable.key, key),
            })

            return project
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    }

    async getAllProjectMembers(
        projectId: string,
        options?: GetProjectMembersOptions
    ) {
        try {
            const { limit = 10, page = 1, search = '', sortBy } = options ?? {}

            const offset = (page - 1) * limit

            const projectMembers = await db
                .select({
                    id: ProjectMembersTable.id,
                    user_id: ProjectMembersTable.user_id,
                    project_id: ProjectMembersTable.id,
                    created_at: ProjectMembersTable.created_at,
                    updated_at: ProjectMembersTable.updated_at,
                    role: RolesTable,
                    user: UserTable,
                })
                .from(ProjectMembersTable)
                .innerJoin(
                    UserTable,
                    eq(UserTable.id, ProjectMembersTable.user_id)
                )
                .innerJoin(
                    RolesTable,
                    eq(RolesTable.id, ProjectMembersTable.role)
                )
                .where(
                    and(
                        eq(ProjectMembersTable.project_id, projectId),
                        search
                            ? or(
                                  ilike(UserTable.first_name, `%${search}%`),
                                  ilike(UserTable.last_name, `%${search}%`),
                                  ilike(UserTable.email, `%${search}%`)
                              )
                            : undefined
                    )
                )
                .limit(limit)
                .offset(offset)

            const [{ count = 1 }] = await db
                .select({
                    count: sql`count(*)`,
                })
                .from(ProjectMembersTable)
            const totalPages = Math.ceil((count as number) / limit)

            return {
                items: projectMembers,
                metadata: {
                    currentPage: page,
                    limit,
                    totalPages,
                    totalCount: count as number,
                },
            }
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    }

    getProjectFields() {
        return {
            id: ProjectTable.id,
            name: ProjectTable.name,
            description: ProjectTable.description,
            logo: ProjectTable.logo,
            created_at: ProjectTable.created_at,
            updated_at: ProjectTable.updated_at,
            deleted_at: ProjectTable.deleted_at,
            total_members: ProjectTable.total_members,
            key: ProjectTable.key,
            role: {
                id: RolesTable.id,
                label: RolesTable.label,
                permissions: RolesTable.permissions,
                created_at: RolesTable.created_at,
                updated_at: RolesTable.updated_at,
            },
        }
    }
}

export default new ProjectsRepository()
