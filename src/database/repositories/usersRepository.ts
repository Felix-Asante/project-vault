import { User } from "@/types/auth";
import { eq } from "drizzle-orm";
import { db } from "..";
import { SubscriptionPlansTable, UserTable } from "../schemas/users";
import { CreateUserDto } from "@/types/dtos/user.dto";
import { SUBSCRIPTION_PLANS } from "@/constants/enum";


 class UsersRepository{
    async getUserById(id: string): Promise<User | null> {
     const users = await db.query.UserTable.findFirst({
        where: eq(UserTable.id, id),
        with:{
            plan:{
                with:{
                    label:true,
                    id:true,
                }
            }
        }
     })
     return users ?? null;
    }

    async getUserByClerkId(clerkId: string): Promise<User | null> {
        const users = await db.query.UserTable.findFirst({
            where: eq(UserTable.user_id, clerkId),
            with:{
                plan:{
                    with:{
                        label:true,
                        id:true,
                    }
                }
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

        const insertedUser = await db.insert(UserTable).values({...data,plan:basicPlan.id})
        return insertedUser[0]
    }
}

export default new UsersRepository();