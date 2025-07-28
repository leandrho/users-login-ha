import { IPasswordHasher } from "../../../shared/application/security/IPasswordHasher";
import { IPasswordResetTokenRepository } from "../../domain/repository/IPasswordResetTokenRepository";
import { ResetPasswordInDTO, ResetPasswordOutDTO } from "../dtos";
import { PasswordResetTokenValue } from "../../domain/value-objects";
import { IUserRepository } from "../../../user/domain/repositories/IUserRepository";
import { ResetPasswordInvalidTokenError, ResetPasswordMismatchError, ResetPasswordAlreadyUsedTokenError, ResetPasswordExpiredTokenError } from "../../domain/errors";
import { UserNotFoundError } from "../../../user/domain/errors";
import { UserPassword } from "../../../user/domain/value-objects";

export class ResetPasswordUseCase{
    constructor(
        private readonly passwordResetTokenRepository: IPasswordResetTokenRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly userRepository : IUserRepository
    ){}

    public async execute(resetPasswordIn: ResetPasswordInDTO): Promise<ResetPasswordOutDTO>{
      
        if(resetPasswordIn.newPassword !== resetPasswordIn.confirmPassword)
            throw new ResetPasswordMismatchError('Passwords do not match');

        const token = await this.passwordResetTokenRepository.findByToken(new PasswordResetTokenValue(resetPasswordIn.token));
        if( !token )
            throw new ResetPasswordInvalidTokenError('Invalid or non-existent password reset token.');

         if( token.isUsed() )
            throw new ResetPasswordAlreadyUsedTokenError('Password reset token has already been used.');

        if(token.isExpired())
            throw new ResetPasswordExpiredTokenError('Token expired');

        const user = await this.userRepository.findById(token.userId);
        if(!user)
            throw new UserNotFoundError('User not found');

        const newHashedPass = await this.passwordHasher.hash(resetPasswordIn.newPassword);
        user.updatePassword(new UserPassword(newHashedPass));
        await this.userRepository.save(user);

        token.markAsUsed();
        await this.passwordResetTokenRepository.save(token);

        return {message: 'Password reset successfully'}
    
    }
}