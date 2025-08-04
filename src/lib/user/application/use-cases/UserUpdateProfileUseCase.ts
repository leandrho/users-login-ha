import { User } from "../../domain/entities";
import { UserNotFoundError } from "../../domain/errors";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserFirstName, UserId, UserLastName, UserRole, UserStatus } from "../../domain/value-objects";
import { UserUpdatedProfileOutDTO, UserUpdatePropsDTO } from "../dtos";

export class UserUpdateProfileUseCase{
    
    constructor(private readonly userRepository: IUserRepository){}

    public async execute( id: string, props: UserUpdatePropsDTO ): Promise<UserUpdatedProfileOutDTO>{
        const user: User | null = await this.userRepository.findById(new UserId(id));
        if(!user)
            throw new UserNotFoundError('User not found - cannot update profile.');

        if(props.firstName)
            user.updateFirstName(new UserFirstName(props.firstName));
        if(props.lastName)
            user.updateLastName(new UserLastName(props.lastName));
        if(props.role)
            user.updateRole(new UserRole(props.role));
        if(props.status)
            user.updateStatus(new UserStatus(props.status))

        await this.userRepository.save(user);
        const userPrimitive = user.toPrimitives();

        return { 
            id: userPrimitive.id, 
            firstName: userPrimitive.firstName, 
            lastName: userPrimitive.lastName, 
            email: userPrimitive.email, 
            role: userPrimitive.role, 
            createdAt: userPrimitive.createdAt, 
            status: userPrimitive.status, 
            lastLogin: userPrimitive.lastLogin, 
        };
    }

}