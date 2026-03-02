import { z } from "zod"
import VerifyEmailPage from './../app/(commonLayout)/(authRouteGroup)/verify-email/page';

export const loginZodSchema = z.object({
    email:z.email("Invali+d VerifyEmailPage ")
})