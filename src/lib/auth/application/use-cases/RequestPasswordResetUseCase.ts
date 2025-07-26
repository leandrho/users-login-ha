import { IUserRepository } from "../../../user/domain/repositories/IUserRepository";
import { IPasswordResetTokenRepository } from "../../domain/repository/IPasswordResetTokenRepository";
import { IEmailService } from "../../../shared/application/email/IEmailService";
import { RequestPasswordResetInDTO } from "../dtos/RequestPasswordResetInDTO";
import { UserEmail } from "../../../user/domain/value-objects";
import { UserNotFoundError } from "../../../user/domain/errors";
import { PasswordResetToken } from "../../domain/entities/PasswordResetToken";
import envs from "../../../../config/envs";


export class RequestPasswordResetUseCase{

    constructor(
        private readonly passwordResetTokenRepository: IPasswordResetTokenRepository,
        private readonly userRespository: IUserRepository,
        private readonly emailService: IEmailService
    ){}

    public async execute(data: RequestPasswordResetInDTO): Promise<void>{
        const user = await this.userRespository.findByEmail(new UserEmail(data.email));
        if(!user)
            throw new UserNotFoundError(`Invalid user email ${data.email}`);
        const token: PasswordResetToken = PasswordResetToken.createNew(user.id.value());
        await this.passwordResetTokenRepository.save(token);

        await this.emailService.send(data.email, `${envs.AUTH.RESET_PASSWORD_URL}?token=${token.token.value()}`)
    }

}