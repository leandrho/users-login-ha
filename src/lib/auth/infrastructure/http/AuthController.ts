import { NextFunction, Request, Response } from "express";
import { AuthService } from "./AuthService";
import { authLoginSchema, registerUserSchema, requestResetPasswordSchema, resetPasswordSchema } from "./auth-schemas";
import { RegisterUserInDTO } from '../../application/dtos/RegisterUserInDTO';
import { ResetPasswordInDTO } from "../../application/dtos";

export class AuthController{

    constructor(private readonly authService: AuthService){}

    public async login(req: Request, res: Response, next: NextFunction):Promise<void>{
        try {
            const valitation = authLoginSchema.safeParse(req.body);
            if(!valitation.success){
                res.status(400).json({message: 'Authentication failed!'});
                    return;
            }   
            const token = await this.authService.login(valitation.data)
        
            res.status(200).json({token});
                
        } catch (error) {
           next(error);
        }

    }

    public async register(req: Request, res: Response, next: NextFunction):Promise<void>{
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
             next(error);
        }
            
    }
    public async requestPasswordReset(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const emailValidated = requestResetPasswordSchema.safeParse(req.body);
            if(!emailValidated.success){
                res.status(400).json({message: 'Invalid request body data', error: emailValidated.error.message});
                return;
            }
            await this.authService.requestPasswordReset(emailValidated.data.email);
            res.status(200).json({message: 'Check your email to reset your password!'});
            
        } catch (error) {
           next(error);
        }
    
    }
    public async resetPassword(req: Request, res: Response, next: NextFunction):Promise<void>{
        try {
            const dataValidated = resetPasswordSchema.safeParse(req.body);
            if(!dataValidated.success){
                res.status(400).json({message: 'Invalid request body data', error: dataValidated.error.message});
                return;
            }
            
            const data: ResetPasswordInDTO = dataValidated.data;
            await this.authService.resetPassword(data);
            res.status(200).json({message: 'Password reset successfully'});

        } catch (error) {
           next(error);
        }
    }

}