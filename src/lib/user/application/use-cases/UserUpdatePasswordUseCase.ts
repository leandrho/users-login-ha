import { User } from '../../domain/entities/User';
import { UserNotFoundError } from '../../domain/errors/UserNotFoundError';
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { UserId, UserPassword } from '../../domain/value-objects';
import { UserInvalidOldPasswordError } from '../../domain/errors/UserInvalidOldPasswordError';
import { UserUpdatePasswordInDTO } from '../dtos/UserUpdatePasswordInDTO';

export class UserUpdatePasswordUseCase{
    constructor(private readonly userRepository: IUserRepository ){}
    
    public async execute(data: UserUpdatePasswordInDTO): Promise<void>{
            const user: User | null = await this.userRepository.findById(new UserId(data.userId));
            if(!user){
                throw new UserNotFoundError('User not found - cannot update password.');
            }
            if(user.password.value() !== data.oldPassword)
                throw new UserInvalidOldPasswordError();

            user.updatePassword(new UserPassword(data.newPassword));
            await this.userRepository.save(user);
    }
}