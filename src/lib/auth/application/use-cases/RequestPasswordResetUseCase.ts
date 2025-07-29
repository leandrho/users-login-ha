import { IUserRepository } from "../../../user/domain/repositories/IUserRepository";
import { IPasswordResetTokenRepository } from "../../domain/repository/IPasswordResetTokenRepository";
import { IEmailService } from "../../../shared/application/email/IEmailService";
import { RequestPasswordResetInDTO, RequestPasswordResetOutDTO } from "../dtos";
import { UserEmail } from "../../../user/domain/value-objects";
import { PasswordResetToken } from "../../domain/entities/PasswordResetToken";
import envs from "../../../../config/envs";


export class RequestPasswordResetUseCase{

    constructor(
        private readonly passwordResetTokenRepository: IPasswordResetTokenRepository,
        private readonly userRespository: IUserRepository,
        private readonly emailService: IEmailService
    ){}

    public async execute(data: RequestPasswordResetInDTO): Promise<RequestPasswordResetOutDTO>{
        const user = await this.userRespository.findByEmail(new UserEmail(data.email));

        if(!user)
            return {message: 'If an account with that email exists, a password reset link has been sent.'};
         
        await this.passwordResetTokenRepository.deleteByUserId(user.id);

        const token: PasswordResetToken = PasswordResetToken.createNew(user.id.value());
        await this.passwordResetTokenRepository.save(token);

        const subject: string = 'Password reset request for your account.';
        const body: string = `<p>Hello,</p>
            <p>You have requested to reset the password for your account.</p>
            <p>Please click on the following link to reset your password:</p>
            <p><a href="${envs.AUTH.RESET_PASSWORD_URL}?token=${token.token.value()}">${envs.AUTH.RESET_PASSWORD_URL}?token=${token.token.value()}</a></p>
            <p>This link will expire in ${envs.AUTH.RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES || 10} minutes.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thank you,</p>
            <p>Your Application Team</p>
            `

        await this.emailService.send({to: data.email, subject, body});
        return {message: 'If an account with that email exists, a password reset link has been sent.'};
    }

}