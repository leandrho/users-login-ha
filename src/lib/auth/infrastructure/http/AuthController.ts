import { Request, Response } from "express";
import { AuthService } from "./AuthService";
import { AuthenticationFailedError } from "../../domain/errors/AuthenticationFailedError";
import { authLoginSchema, registerUserSchema } from "./auth-schemas";
import { RegisterUserInDTO } from '../../application/dtos/RegisterUserInDTO';
import { UserDuplicatedEmailError, UserInvalidPasswordError, UserInvalidPropertyError } from "../../../user/domain/errors";

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

    public async register(req: Request, res: Response):Promise<void>{
        try {
            
            const userInfo = registerUserSchema.safeParse(req.body);
            if(!userInfo.success){
                res.status(400).json({message: 'Invalid request body data', error: userInfo.error.message});
                return;
            }
            const registerUserDto: RegisterUserInDTO = userInfo.data;
            const user = await this.authService.register(registerUserDto);
            res.status(201).json(user);

        } catch (error) {
             if(error instanceof UserDuplicatedEmailError)
                res.status(409).json({message: error.message});
            else if(error instanceof UserInvalidPropertyError)
                res.status(400).json({message: error.message, property: error.propName});
            else if(error instanceof UserInvalidPasswordError)
                res.status(400).json({message: error.message});
            else {
                res.status(500).json( {message: 'Internal server error'});
                console.error("Internal Server Error:", error); // Log the error for debugging
            }
        }
            
    }

}