import { Request, Response, NextFunction } from "express";
import { UserRoleEnum } from '../../../../user/domain/value-objects/UserRole';


export const authorizeRoleMid = (role: UserRoleEnum[]) =>
    (req: Request, res: Response, next: NextFunction)=>{
        const userRole: string | undefined = req.user?.role;
        
        if(!userRole)
            return res.status(401).json({message: 'Unauthorized: User role information is missing.'});

        if(!role.includes(userRole as UserRoleEnum))
            return res.status(403).json({message: 'Forbidden: Insufficient role permissions.'});
        
        next();
    }