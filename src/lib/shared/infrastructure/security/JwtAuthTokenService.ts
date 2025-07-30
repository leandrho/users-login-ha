
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload, IAuthTokenService } from "../../application/security/IAuthTokenService";
import envs from '../../../../config/envs';

export class JwtAuthTokenService implements IAuthTokenService{
    private accessSecret: string;
    private accessExpirationTime: string;
    private refreshSecret: string;
    private refreshExpirationTime: string;
    constructor(){
        this.accessSecret = envs.AUTH.JWT_ACCESS_SECRET;
        this.accessExpirationTime = envs.AUTH.JWT_ACCESS_EXPIRATION_TIME; 
        this.refreshSecret = envs.AUTH.JWT_REFRESH_SECRET;
        this.refreshExpirationTime = envs.AUTH.JWT_REFRESH_EXPIRATION_TIME;
        
        if (!this.accessSecret) throw new Error('JWT_ACCESS_SECRET is not defined');
        if (!this.accessExpirationTime) throw new Error('JWT_ACCESS_EXPIRATION_TIME is not defined');
        if (!this.refreshSecret) throw new Error('JWT_REFRESH_SECRET is not defined');
        if (!this.refreshExpirationTime) throw new Error('JWT_REFRESH_EXPIRATION_TIME is not defined');

    }
    generateToken(userId: string, userRole: string): string {
        const payload = { userId, role: userRole };
        return jwt.sign(payload, this.accessSecret, { expiresIn: +this.accessExpirationTime*60 });
    }
    validateToken(token: string): AuthTokenPayload | null {
        try{
            return jwt.verify(token, this.accessSecret) as AuthTokenPayload;
        }
        catch(err){
            return null;
        }

    }
    
}