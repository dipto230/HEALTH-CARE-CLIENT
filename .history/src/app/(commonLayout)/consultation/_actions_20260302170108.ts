"use server";

import { httpClient } from "@/lib/axios/httpClient";

interface IDoctor{
    id: number;
    name: string;
    specia
}

export const getDoctors = async () => {
    const doctors = await httpClient.get('/doctors');
    console.log(doctors, "server");
    return doctors;
}