
"use server"
import jwt from "jsonwebtoken"
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN;

const getTokenSecondsRemaining = (token: string): number => {
    if (!token) return 0;
    try {
        const tokenPayload = JWT_ACCESS_TOKEN? 
        
    } catch (error) {
        
    }
}