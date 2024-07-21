import { User } from "@/types/auth";
import { eq } from "drizzle-orm";
import { db } from "..";
import { SubscriptionPlansTable, UserTable } from "../schemas/users";
import { CreateUserDto } from "@/types/dtos/user.dto";
import { SUBSCRIPTION_PLANS } from "@/constants/enum";
import { getRandomNumbers } from "@/utils";


 class UsersRepository{

    async createUserSlug(first_name:string,last_name:string){
        return `${first_name.toLowerCase()}${last_name.toLowerCase()}${getRandomNumbers(4)}-project`;
    }

    async getUserById(id: string): Promise<User | null> {
     const users = await db.query.UserTable.findFirst({
        where: eq(UserTable.id, id),
        with:{
            plan:true
        }
     })
     return users ?? null;
    }

    async getUserByClerkId(clerkId: string): Promise<User | null> {
        const users = await db.query.UserTable.findFirst({
            where: eq(UserTable.user_id, clerkId),
            with:{
                plan:true
            }
        })
        return users?? null;
    }

    async updateUser(id: string,data: Partial<User>): Promise<void> {
        const user = await this.getUserById(id)
        if(!user) throw new Error('User not found')

        await db.update(UserTable).set(data).where(eq(UserTable.id, id))
    }

    async createUser(data: CreateUserDto): Promise<User> {
        const basicPlan  = await db.query.SubscriptionPlansTable.findFirst({ where: eq(SubscriptionPlansTable.label, SUBSCRIPTION_PLANS.BASIC) })
        if(!basicPlan) throw new Error('cannot create user with basic plan')

        const slug = await this.createUserSlug(data.first_name, data.last_name)

        const insertedUser = await db.insert(UserTable).values({...data,slug,plan:basicPlan.id})
        return insertedUser[0]
    }

    async deleteUser(id:string){
        await db.delete(UserTable).where(eq(UserTable.user_id, id))
    }
}

export default new UsersRepository();