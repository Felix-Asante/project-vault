import { Member_Owner_Permission } from '@/constants/data'
import { Roles } from '@/constants/enum'
import { db } from '@/database'
import { getErrorMessage } from '@/utils'

import { CreateProjectDto } from '@/types/dtos/project.dto'
import { ProJects } from '@/types/projects'

import { ProjectMembersTable, ProjectTable } from '../schemas/projects'
import authRepository from './authRepository'
import usersRepository from './usersRepository'

class ProjectsRepository {
    async createProject(
        userId: string,
        data: CreateProjectDto
    ): Promise<ProJects> {
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
                    .values(data)
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
}

export default new ProjectsRepository()
