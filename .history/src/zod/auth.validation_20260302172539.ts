import { z } from "zod"


export const loginZodSchema = z.object({
    email:z.email("Invalid email address")
})