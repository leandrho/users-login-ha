import { User } from '../../domain/entities/User';
import { UserNotFoundError } from '../../domain/errors/UserNotFoundError';
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { UserId, UserPassword } from '../../domain/value-objects';
import { UserInvalidOldPasswordError } from '../../domain/errors/UserInvalidOldPasswordError';
import { UserUpdatePasswordInDTO } from '../dtos/UserUpdatePasswordInDTO';
import { UserInvalidPasswordError } from '../../domain/errors/UserInvalidPasswordError';
import { IPasswordHasher } from 'src/lib/shared/application/security/IPasswordHasher';

export class UserUpdatePasswordUseCase{
    constructor(private readonly userRepository: IUserRepository, private readonly passwordHasher: IPasswordHasher ){}
    
    public async execute(data: UserUpdatePasswordInDTO): Promise<void>{
            const user: User | null = await this.userRepository.findById(new UserId(data.userId));
            if(!user){
                throw new UserNotFoundError('User not found - cannot update password.');
            }
            
            if(!data.newPassword || !data.oldPassword)
                throw new UserInvalidPasswordError('Password is invalid.');
            
            const matchOldPass: boolean = await this.passwordHasher.compare(data.oldPassword, user.password.value());
            if(!matchOldPass)
                throw new UserInvalidOldPasswordError();

            const newPassHash: string = await this.passwordHasher.hash(data.newPassword);
            user.updatePassword(new UserPassword(newPassHash));

            await this.userRepository.save(user);
    }
}