import {NextFunction, Request, Response } from 'express';

import { UserService } from './UserService';
import { UserCreatedOutDTO, UserCreateInDTO, UserUpdatedProfileOutDTO, UserUpdatePasswordInDTO, UserDTO, UserUpdatePropsDTO } from '../../application/dtos';
import { createUserSchema, updateProfileSchema, userEmailSchema, userIdSchema, userUpdatePasswordSchema } from './user-schemas';

export class UserController{

    constructor(private readonly userService: UserService){}

    public async create(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const { success, data, error } = createUserSchema.safeParse(req.body);
            if(!success){
                res.status(400).json({message: 'Invalid request body data', error: error.message});
                return;
            }

            const userIn: UserCreateInDTO = data
            const user: UserCreatedOutDTO = await this.userService.create(userIn);
            res.status(201).json(user);
        }
        catch(error){
            next(error);
        }
    }
    
    public async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const idValidation = userIdSchema.safeParse(req.params.id);
            if(!idValidation.success){
                res.status(400).json({message: 'Invalid id parameter', error: idValidation.error.message});
                return;
            }

            const user: UserDTO | null = await this.userService.findById(idValidation.data);
            if(!user){
                res.status(404).json({message: 'User not found'});
                return;
            }
            if(req.user?.role!== 'admin' && req.user?.userId !== user?.id){
                res.status(403).json({message: 'Forbidden: You can only update your own profile.'});
                return;
            }

            const profileValidation = updateProfileSchema.safeParse(req.body);
            if(!profileValidation.success){
                res.status(400).json({message: 'Invalid request body data', error: profileValidation.error.message});
                return;
            }
            const values: UserUpdatePropsDTO = profileValidation.data;
            const userUpdated: UserUpdatedProfileOutDTO = await this.userService.updateProfile(idValidation.data, values);
            console.log(userUpdated);
            res.status(200).json(userUpdated);
        }
        catch(error){
            next(error);
        }
    }

    public async updatePassword(req: Request, res: Response, next: NextFunction): Promise<void>{
            try{
                const idValidation = userIdSchema.safeParse(req.params.id);
                if(!idValidation.success){
                    res.status(400).json({message: 'Invalid id parameter', error: idValidation.error.message});
                    return;
                }
                
                const user: UserDTO | null = await this.userService.findById(idValidation.data);
                if(!user){
                    res.status(404).json({message: 'User not found'});
                    return;
                }
                if(req.user?.role!== 'admin' && req.user?.userId !== user?.id){
                    res.status(403).json({message: 'Forbidden: You can only change your own password.'});
                    return;
                }

                const dataValidation = userUpdatePasswordSchema.safeParse(req.body);
                if(!dataValidation.success){
                    res.status(400).json({message: 'Invalid request body data', error: dataValidation.error.message});
                    return;
                }
                const dataIn: UserUpdatePasswordInDTO = {
                        userId: idValidation.data, 
                        oldPassword: dataValidation.data.oldPassword, 
                        newPassword: dataValidation.data.newPassword
                };
                await this.userService.updatePassword(dataIn);
                res.status(200).json({message: 'Password updated successfully'});
            }
            catch(error){
               next(error);
            }
    }

    public async findById(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const idValidation = userIdSchema.safeParse(req.params.id);
            if(!idValidation.success){
                res.status(400).json({message: 'Invalid id parameter', error: idValidation.error.message});
                return;
            }
            const user: UserDTO | null = await this.userService.findById(idValidation.data);
            
            if(!user){
                res.status(404).json({message: 'User not found'});
                return;
            }
            
            if(req.user?.role!== 'admin' && req.user?.userId !== user?.id){
                res.status(403).json({message: 'Forbidden: Insufficient role permissions.'});
                return;
            }

            
            res.status(200).json(user);

        } catch (error) {
           next(error);
        }
    }

    public async findByEmail(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const emailValidation = userEmailSchema.safeParse(req.query.email);
            if(!emailValidation.success){
                res.status(400).json({message: 'Invalid email query parameter', error: emailValidation.error.message});
                return;
            }
            const user: UserDTO | null = await this.userService.findByEmail(emailValidation.data);
            if(!user){
                res.status(404).json({message: 'User not found'});
                return;
            }
            
            res.status(200).json(user);

        } catch (error) {
            next(error);
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const users: UserDTO[] = await this.userService.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
            console.error("Internal Server Error:", error); // Log the error for debugging
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            
            const idValidation = userIdSchema.safeParse(req.params.id);
            if(!idValidation.success){
                res.status(400).json({message: 'Invalid id parameter', error: idValidation.error.message});
                return;
            }
            await this.userService.delete(idValidation.data);
            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }

}