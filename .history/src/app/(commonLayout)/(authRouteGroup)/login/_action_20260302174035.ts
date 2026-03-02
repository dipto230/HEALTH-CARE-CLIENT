import { httpClient } from "@/lib/axios/httpClient";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload } from "@/zod/auth.validation";

export const loginAction = async (payload: ILoginPayload): Promise<ILoginResponse> => {
    const parsedPayload = login
    try {
        const response = await httpClient.post<ILoginResponse>("/auth/login", payload)
        return response.data.
        
    } catch (error) {
        
    }
}