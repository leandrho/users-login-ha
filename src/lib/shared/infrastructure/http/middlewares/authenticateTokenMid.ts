
import { Request, Response, NextFunction } from "express";
import { IAuthTokenService } from '../../../application/security/IAuthTokenService';


export const authenticateTokenMid = (authService: IAuthTokenService) => 
    (req: Request, res: Response, next: NextFunction) => {
        
        const authHeader: string | undefined = req.headers.authorization;
        if(!authHeader || !authHeader?.startsWith('Bearer '))
            return res.status(401).json({message: 'Unauthorized'});

        const token: string = authHeader.split(' ')[1];
        const payload = authService.validateToken(token);
        if(!payload)
            return res.status(401).json({message: 'Invalid token'});
        req.user = payload;
        next();
    }