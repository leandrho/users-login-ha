import { User } from "../../domain/entities/User";
import { UserDuplicatedEmailError } from "../../domain/errors/UserEmailDuplicatedError";
import { UserInvalidPropertyError } from "../../domain/errors/UserInvalidPropertyError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserEmail } from "../../domain/value-objects";
import { UserCreatedOutDTO } from "../dtos/UserCreatedOutDTO";
import { UserCreateInDTO } from "../dtos/UserCreateInDTO";

export class UserCreateUseCase {
    
    constructor(private readonly userRepository: IUserRepository){}

    public async execute( createUser: UserCreateInDTO ): Promise<UserCreatedOutDTO>{

        const user: User | null = await this.userRepository.findByEmail(new UserEmail(createUser.email));
        if(user)
            throw new UserDuplicatedEmailError(createUser.email);
        
        const newUser: User = User.createNew(createUser.fullname, createUser.email, createUser.password, createUser.role);
        await this.userRepository.save(newUser);

        const userPrimitive = newUser.toPrimitives();

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