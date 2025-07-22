import { Request, Response } from "express";
import { AuthService } from "./AuthService";
import { AuthenticationFailedError } from "../../domain/errors/AuthenticationFailedError";
import { authLoginSchema } from "./auth-schemas";

export class AuthController{

    constructor(private readonly authService: AuthService){}

    public async login(req: Request, res: Response):Promise<void>{
        try {
            const valitation = authLoginSchema.safeParse(req.body);
            if(!valitation.success){
                res.status(400).json({message: 'Authentication failed!'});
                    return;
            }   
            const token = await this.authService.login(valitation.data)
        
            res.status(200).json({token});
                
        } catch (error) {

            if(error instanceof AuthenticationFailedError)
                res.status(401).json({message: error.message});
            else
                res.status(500).json({message: 'Internal Server Error'});

            console.error("Auth Controller Error: ", { error });
        }

    }

}