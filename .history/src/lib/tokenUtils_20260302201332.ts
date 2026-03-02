
"use server"
import jwt from "jsonwebtoken"
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

const getTokenSecondsRemaining = (token: string): number => {
    if (!token) return 0;
    try {
        const tokenPayload = JWT_ACCESS_SECRET ? jwt.verify(token, JWT_ACCESS_SECRET as string) : jwt.decode(token);
        
        
        
    } catch (error) {
        
    }
}