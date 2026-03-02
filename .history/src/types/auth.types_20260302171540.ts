export interface ILoginResponse{
    token: string;
    accessToken: string;
    refreshToken: string;
    user: {
        needPasswordChange: boolean;
        email: string;
        role: string;
        profilePhoto: string;
        emailVerified
    }
}