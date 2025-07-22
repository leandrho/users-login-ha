
export interface AuthTokenPayload {
    userId: string;
    role: string;
}

export interface IAuthTokenService {

    generateToken(userId: string, userRole: string): string;
    validateToken(token: string): AuthTokenPayload | null;

}