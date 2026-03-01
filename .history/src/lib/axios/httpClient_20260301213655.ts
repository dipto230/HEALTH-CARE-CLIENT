import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in environment variables');
}


const axiosInstance = () => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
            'Content-Type':'application/json'
        }


    })
    return instance
}

export interface ApiRequestOptions{
    params?: Record<string, unknown>;
    headers?: Record<string, unknown>;
}

const httpGet = async (endpoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().get(endpoint, {
            params: options?.params,
            headers:options?.headers,
        })
    } catch (error) {
        
    }
}

export const httpClient = {
    
}