import { IPasswordHasher } from "src/lib/shared/application/security/IPasswordHasher";
import { IPasswordResetTokenRepository } from "../../domain/repository/IPasswordResetTokenRepository";
import { CreateNewPasswordInDTO } from "../dtos/CreateNewPasswordInDTO";
import { PasswordResetTokenValue } from "../../domain/value-objects";
import { IUserRepository } from "src/lib/user/domain/repositories/IUserRepository";
import { CreateNewPasswordInvalidTokenError } from "../../domain/errors/CreateNewPasswordInvalidToken";
import { CreateNewPasswordMismatchError } from "../../domain/errors/CreateNewPasswordMismatchError";
import { UserNotFoundError } from "src/lib/user/domain/errors";
import { UserPassword } from "src/lib/user/domain/value-objects";
import { CreateNewPasswordExpiredTokenError } from "../../domain/errors/CreateNewPasswordExpiredToken";
export class CreateNewPasswordUseCase{
    constructor(
        private readonly passwordResetTokenRepository: IPasswordResetTokenRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly userRepository : IUserRepository
    ){}

    public async execute(createNewPasswordIn: CreateNewPasswordInDTO): Promise<void>{
        const token = await this.passwordResetTokenRepository.findByToken(new PasswordResetTokenValue(createNewPasswordIn.token));
        if(!token || token.isUsed())
            throw new CreateNewPasswordInvalidTokenError('Invalid token');
        if(token.isExpired())
            throw new CreateNewPasswordExpiredTokenError('Token expired');

        if(createNewPasswordIn.newPassword !== createNewPasswordIn.confirmPassword)
            throw new CreateNewPasswordMismatchError('Passwords do not match');

        const user = await this.userRepository.findById(token.userId);
        if(!user)
            throw new UserNotFoundError('User not found');

        const newHashedPass = await this.passwordHasher.hash(createNewPasswordIn.newPassword);
        user.updatePassword(new UserPassword(newHashedPass));
        await this.userRepository.save(user);

        token.markAsUsed();
        await this.passwordResetTokenRepository.save(token);
    
    }
}