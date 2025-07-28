import { AuthUserLoginInDTO, AuthUserLoginOutDTO, RegisterUserInDTO, RegisterUserOutDTO, RequestPasswordResetOutDTO, ResetPasswordOutDTO } from '../../application/dtos';
import { AuthRegisterUserUseCase } from '../../application/use-cases/AuthRegisterUserUseCase';
import { AuthUserLoginUseCase } from '../../application/use-cases/AuthUserLoginUseCase';
import { ResetPasswordUseCase } from '../../application/use-cases/ResetPasswordUseCase';
import { RequestPasswordResetUseCase } from '../../application/use-cases/RequestPasswordResetUseCase';
import { ResetPasswordInDTO } from '../../application/dtos/ResetPasswordInDTO';

export class AuthService {
    constructor(
        private readonly authLoginUC: AuthUserLoginUseCase, 
        private readonly authRegisterUC: AuthRegisterUserUseCase,
        private readonly requestPasswordResetUC: RequestPasswordResetUseCase,
        private readonly resetPasswordUC: ResetPasswordUseCase
    ){}

    public async login(userCred: AuthUserLoginInDTO): Promise<AuthUserLoginOutDTO>{
        return await this.authLoginUC.execute(userCred);
    }

    public async register(userRegister: RegisterUserInDTO): Promise<RegisterUserOutDTO>{
        return await this.authRegisterUC.execute(userRegister);
    }

    public async requestPasswordReset(email: string): Promise<RequestPasswordResetOutDTO>{
        return await this.requestPasswordResetUC.execute({email});
    }

    public async resetPassword(data: ResetPasswordInDTO): Promise<ResetPasswordOutDTO>{
        return await this.resetPasswordUC.execute(data);
    }


}