'use server'

import usersRepository from "@/database/repositories/usersRepository";
import { CreateUserDto } from "@/types/dtos/user.dto";
import { getErrorMessage } from "@/utils";

export async function onCreatedUser(user: CreateUserDto) {
    try{
        const createdUser = await usersRepository.createUser(user)
        return {error: null, user: createdUser}
    }catch(error){
        console.error('Error on user created', error)
        return {error:getErrorMessage(error),user: null}
    }
}