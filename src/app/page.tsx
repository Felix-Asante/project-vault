import { onGetUserByClerkId } from "@/lib/actions/users";
import { notFound, redirect } from "next/navigation";

export default async function Home() {
  const {user,error} = await onGetUserByClerkId()
  if(!user || error )  return notFound()
    
  console.log("HOME ERROR", user)

  return redirect(`/${user.slug}`)
 
}
