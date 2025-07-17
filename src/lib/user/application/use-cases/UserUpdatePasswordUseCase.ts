import { User } from '../../domain/entities/User';
import { UserNotFoundError } from '../../domain/errors/UserNotFoundError';
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { UserId, UserPassword } from '../../domain/value-objects';

export class UserUpdatePasswordUseCase{
    constructor(private readonly userRepository: IUserRepository ){}
    
    public async execute(id: string, password: string): Promise<void>{
            const user: User | null = await this.userRepository.findById(new UserId(id));
            if(!user){
                throw new UserNotFoundError('User not found - cannot update password.');
            }
            user.updatePassword(new UserPassword(password))
            await this.userRepository.save(user);
    }
}