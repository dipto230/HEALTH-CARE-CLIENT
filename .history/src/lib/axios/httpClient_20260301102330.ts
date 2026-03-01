import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in environment variables');
}


const axiosInstance = () => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout:5000,

    })
}

export const httpClient = {
    
}