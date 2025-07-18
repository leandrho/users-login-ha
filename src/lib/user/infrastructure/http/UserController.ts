import {Request, Response } from 'express';

import { UserService } from './UserService';
import { UserCreatedOutDTO } from '../../application/dtos/UserCreatedOutDTO';
import { UserCreateInDTO } from '../../application/dtos/UserCreateInDTO';
import { UserDuplicatedEmailError } from '../../domain/errors/UserEmailDuplicatedError';
import { UserInvalidPropertyError } from '../../domain/errors/UserInvalidPropertyError';
import { UserInvalidPasswordError } from '../../domain/errors/UserInvalidPasswordError';

import { createUserSchema, updateProfileSchema, userIdSchema, userUpdatePasswordSchema } from './user-schemas';
import { UserUpdatedProfileOutDTO } from '../../application/dtos/UserUpdatedProfileOutDTO';
import { UpdateUserProps } from '../../domain/types/UpdateUserProps';
import { UserNotFoundError } from '../../domain/errors/UserNotFoundError';
import { UserUpdatePasswordInDTO } from '../../application/dtos/UserUpdatePasswordInDTO';
import { UserInvalidOldPasswordError } from '../../domain/errors/UserInvalidOldPasswordError';



export class UserController{

    constructor(private readonly userService: UserService){}

    public async create(req: Request, res: Response): Promise<void>{
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
            if(error instanceof UserDuplicatedEmailError)
                res.status(409).json({message: error.message});
            else if(error instanceof UserInvalidPropertyError)
                res.status(400).json({message: error.message, property: error.propName});
            else if(error instanceof UserInvalidPasswordError)
                res.status(400).json({message: error.message});
            else
                res.status(500).json( {message: 'Internal server error'});
        }
    }
    
    public async updateProfile(req: Request, res: Response): Promise<void>{
        try{
            const idValidation = userIdSchema.safeParse(req.params.id);
            if(!idValidation.success){
                res.status(400).json({message: 'Invalid id parameter', error: idValidation.error.message});
                return;
            }
            const profileValidation = updateProfileSchema.safeParse(req.body);
            if(!profileValidation.success){
                res.status(400).json({message: 'Invalid request body data', error: profileValidation.error.message});
                return;
            }
            const values: UpdateUserProps = profileValidation.data;
            const userUpdated: UserUpdatedProfileOutDTO = await this.userService.updateProfile(idValidation.data, values);
            res.status(200).json(userUpdated);
        }
        catch(error){
            if(error instanceof UserNotFoundError)
                res.status(404).json({message: error.message});
            else if(error instanceof UserInvalidPropertyError)
                res.status(400).json({message: error.message, property: error.propName});
            else
                res.status(500).json({message: 'Internal server error'});
        }
    }

    public async updatePassword(req: Request, res: Response): Promise<void>{
            try{
                const idValidation = userIdSchema.safeParse(req.params.id);
                if(!idValidation.success){
                    res.status(400).json({message: 'Invalid id parameter', error: idValidation.error.message});
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
                if(error instanceof UserNotFoundError)
                    res.status(404).json({message: error.message});
                else if(error instanceof UserInvalidPropertyError)
                    res.status(400).json({message: error.message, property: error.propName});
                else if(error instanceof UserInvalidPasswordError)
                    res.status(400).json({message: error.message})
                else if(error instanceof UserInvalidOldPasswordError)
                    res.status(400).json({message: error.message})
                else
                    res.status(500).json({message: 'Internal server error'});
            }
    }



}