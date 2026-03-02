import {cookies} from "next/he"
export const setCookie = async (
    name:string,
    value:string,
    maxAgeInSeconds:numbers,
)=>{
    const cookieStore = await cookies
}