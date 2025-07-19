import { IPasswordHasher } from "src/lib/shared/application/security/IPasswordHasher";
import { User } from "../../domain/entities";
import { UserDuplicatedEmailError, UserInvalidPasswordError } from "../../domain/errors";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserEmail } from "../../domain/value-objects";
import { UserCreatedOutDTO, UserCreateInDTO } from "../dtos";

export class UserCreateUseCase {
    
    private static readonly MIN_PASSWORD_LENGTH: number = 8;


    constructor(private readonly userRepository: IUserRepository, private readonly passwordHasher: IPasswordHasher){}

    public async execute( createUser: UserCreateInDTO ): Promise<UserCreatedOutDTO>{

        const user: User | null = await this.userRepository.findByEmail(new UserEmail(createUser.email));
        if(user)
            throw new UserDuplicatedEmailError(createUser.email);
        
        if(!createUser.password || createUser.password.length < UserCreateUseCase.MIN_PASSWORD_LENGTH)
            throw new UserInvalidPasswordError();
        
        const hashedPassword: string = await this.passwordHasher.hash(createUser.password);

        const newUser: User = User.createNew(createUser.fullname, createUser.email, hashedPassword, createUser.role);
        
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