import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
    throw new 
}


const axiosInstance = () => {
    const instance = axios.create({

    })
}

export const httpClient = {
    
}