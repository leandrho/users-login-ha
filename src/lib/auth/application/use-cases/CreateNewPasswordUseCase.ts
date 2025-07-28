import { IPasswordHasher } from "../../../shared/application/security/IPasswordHasher";
import { IPasswordResetTokenRepository } from "../../domain/repository/IPasswordResetTokenRepository";
import { CreateNewPasswordInDTO, CreateNewPasswordOutDTO } from "../dtos";
import { PasswordResetTokenValue } from "../../domain/value-objects";
import { IUserRepository } from "../../../user/domain/repositories/IUserRepository";
import { CreateNewPasswordInvalidTokenError, CreateNewPasswordMismatchError, CreateNewPasswordAlreadyUserdTokenError, CreateNewPasswordExpiredTokenError } from "../../domain/errors";
import { UserNotFoundError } from "../../../user/domain/errors";
import { UserPassword } from "../../../user/domain/value-objects";

export class CreateNewPasswordUseCase{
    constructor(
        private readonly passwordResetTokenRepository: IPasswordResetTokenRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly userRepository : IUserRepository
    ){}

    public async execute(createNewPasswordIn: CreateNewPasswordInDTO): Promise<CreateNewPasswordOutDTO>{
      
        if(createNewPasswordIn.newPassword !== createNewPasswordIn.confirmPassword)
            throw new CreateNewPasswordMismatchError('Passwords do not match');

        const token = await this.passwordResetTokenRepository.findByToken(new PasswordResetTokenValue(createNewPasswordIn.token));
        if( !token )
            throw new CreateNewPasswordInvalidTokenError('Invalid or non-existent password reset token.');

         if( token.isUsed() )
            throw new CreateNewPasswordAlreadyUserdTokenError('Password reset token has already been used.');

        if(token.isExpired())
            throw new CreateNewPasswordExpiredTokenError('Token expired');

        const user = await this.userRepository.findById(token.userId);
        if(!user)
            throw new UserNotFoundError('User not found');

        const newHashedPass = await this.passwordHasher.hash(createNewPasswordIn.newPassword);
        user.updatePassword(new UserPassword(newHashedPass));
        await this.userRepository.save(user);

        token.markAsUsed();
        await this.passwordResetTokenRepository.save(token);

        return {message: 'Password reset successfully'}
    
    }
}