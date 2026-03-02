import { httpClient } from "@/lib/axios/httpClient";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload } from "@/zod/auth.validation";

export const loginAction = async (payload: ILoginPayload):Promise<ILoginResponse>=> {
    try {
        const response = await httpClient
        
    } catch (error) {
        
    }
}