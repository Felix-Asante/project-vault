'use server'

import { createUsersRepository } from '@/database/repositories/usersRepository'
import { getErrorMessage } from '@/utils'
import { currentUser } from '@clerk/nextjs/server'

import { CreateUserDto } from '@/types/dtos/user.dto'

export async function onCreatedUser(user: CreateUserDto) {
    try {
        const usersRepository = createUsersRepository()
        const createdUser = await usersRepository.createUser(user)
        return { error: null, user: createdUser }
    } catch (error) {
        console.error('Error on user created', error)
        return { error: getErrorMessage(error), user: null }
    }
}
export async function onDeleteUser(userId: string) {
    try {
        const usersRepository = createUsersRepository()
        await usersRepository.deleteUser(userId)
        return { message: 'User deleted successfully', deleted: true }
    } catch (error) {
        console.error('Error on user created', error)
        return { message: getErrorMessage(error), deleted: false }
    }
}
export async function onGetUserByClerkId() {
    try {
        const usersRepository = createUsersRepository()
        const user = await currentUser()

        if (!user) return { error: 'User not found', user: null }

        const newUser = await usersRepository.getUserByClerkId(user.id)
        return { error: null, user: newUser }
    } catch (error) {
        console.error('Error on user created', error)
        return { error: getErrorMessage(error), user: null }
    }
}
