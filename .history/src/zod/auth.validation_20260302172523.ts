import { z } from "zod"


export const loginZodSchema = z.object({
    email:z.email("Invali+d")
})