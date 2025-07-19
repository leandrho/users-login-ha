import { User } from "../../domain/entities";
import { UserNotFoundError } from "../../domain/errors";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UpdateUserProps } from "../../domain/types/UpdateUserProps";
import { UserFullname, UserId, UserRole, UserStatus } from "../../domain/value-objects";
import { UserUpdatedProfileOutDTO } from "../dtos";

export class UserUpdateProfileUseCase{
    
    constructor(private readonly userRepository: IUserRepository){}

    public async execute( id: string, props: UpdateUserProps ): Promise<UserUpdatedProfileOutDTO>{
        const user: User | null = await this.userRepository.findById(new UserId(id));
        if(!user)
            throw new UserNotFoundError('User not found - cannot update profile.');

        if(props.fullName)
            user.updateFullname(new UserFullname(props.fullName));
        if(props.role)
            user.updateRole(new UserRole(props.role));
        if(props.status)
            user.updateStatus(new UserStatus(props.status))

        await this.userRepository.save(user);
        const userPrimitive = user.toPrimitives();

        return { 
            id: userPrimitive.id, 
            fullName: userPrimitive.fullName, 
            email: userPrimitive.email, 
            role: userPrimitive.role, 
            createdAt: userPrimitive.createdAt, 
            status: userPrimitive.status, 
            lastLogin: userPrimitive.lastLogin, 
        };
    }

}