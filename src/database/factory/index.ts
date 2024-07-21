import { db } from "@/database/index";
import { SubscriptionPlansTable } from "../schemas/users";
import { PLANS } from "./data";


async function seedDb(){
    try{
        const plans = await db.select().from(SubscriptionPlansTable);

    if(plans.length===0){
        await db.insert(SubscriptionPlansTable).values(PLANS)
    }
    }catch(error){
        console.error('Error seeding database', error);
        process.exit(1);
    }
}

seedDb();