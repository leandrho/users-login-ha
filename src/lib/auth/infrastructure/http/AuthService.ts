import { AuthUserLoginInDTO, AuthUserLoginOutDTO, RegisterUserInDTO, RegisterUserOutDTO } from '../../application/dtos';
import { AuthRegisterUserUseCase } from '../../application/use-cases/AuthRegisterUserUseCase';
import { AuthUserLoginUseCase } from '../../application/use-cases/AuthUserLoginUseCase';
import { RequestPasswordResetUseCase } from '../../application/use-cases/RequestPasswordResetUseCase';

export class AuthService {
    constructor(
        private readonly authLogin: AuthUserLoginUseCase, 
        private readonly authRegister: AuthRegisterUserUseCase,
        private readonly requestPasswordResetUC: RequestPasswordResetUseCase
    ){}

    public async login(userCred: AuthUserLoginInDTO): Promise<AuthUserLoginOutDTO>{
        return await this.authLogin.execute(userCred);
    }

    public async register(userRegister: RegisterUserInDTO): Promise<RegisterUserOutDTO>{
        return await this.authRegister.execute(userRegister);
    }

    public async requestPasswordReset(email: string): Promise<void>{
        return await this.requestPasswordResetUC.execute({email});
    }

}