import { httpClient } from "@/lib/axios/httpClient";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";

export const loginAction = async (payload: ILoginPayload): Promise<ILoginResponse> => {
    const parsedPayload = loginZodSchema.safeParse(payload);
    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        retu
    }
    try {
        const response = await httpClient.post<ILoginResponse>("/auth/login", payload)
        return response.data.
        
    } catch (error) {
        
    }
}