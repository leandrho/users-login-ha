import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserEmail, UserId } from '../../domain/value-objects';
import { UserDTO } from '../dtos/UserDTO';

export class UserQueryService{

    constructor( private readonly userRepository: IUserRepository ){}

    public async findById(id: string): Promise<UserDTO | null>{
        const user: User | null = await this.userRepository.findById(new UserId(id));
        if(!user)
            return null;
        return UserQueryService.toUserDTO(user)
    }
    
    public async findByEMail(email: string): Promise<UserDTO | null>{
        const user: User | null = await this.userRepository.findByEmail(new UserEmail(email));
        if(!user)
            return null;
        return UserQueryService.toUserDTO(user);
    }

    public async findAll(): Promise<UserDTO[]>{
        const users: User[] = await this.userRepository.findAll();
        // const ret: UserDTO[] = [];
        // for(const user of users)
        //     ret.push(UserQueryService.toUserDTO(user));
        return users.map(user => UserQueryService.toUserDTO(user));
    }

    private static toUserDTO(user: User): UserDTO{
        return {
            id: user.id.value(),
            fullName: user.fullName.value(),
            email: user.email.value(),
            role: user.role.value(),
            createdAt: user.createdAt.value(),
            status: user.status.value(),
            lastLogin: user.lastLogin ? user.lastLogin.value() : undefined,
        }
    }
}