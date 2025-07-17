import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class UserCreateUseCase {
    
    constructor(private readonly userRepository: IUserRepository){}

    public async execute( fullname: string, email: string, password: string, role: string): Promise<void>{
        const newUser: User = User.createNew(fullname, email, password, role);
        await this.userRepository.save(newUser);
    }
}