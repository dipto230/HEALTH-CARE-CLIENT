import {cookies} from "next"
export const setCookie = async (
    name:string,
    value:string,
    maxAgeInSeconds:numbers,
)=>{
    const cookieStore = await cookies
}