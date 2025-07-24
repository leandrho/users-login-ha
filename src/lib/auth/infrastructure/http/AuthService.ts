import { AuthUserLoginInDTO, AuthUserLoginOutDTO, RegisterUserInDTO, RegisterUserOutDTO } from '../../application/dtos';
import { AuthRegisterUserUseCase } from '../../application/use-cases/AuthRegisterUserUseCase';
import { AuthUserLoginUseCase } from '../../application/use-cases/AuthUserLoginUseCase';

export class AuthService {
    constructor(private readonly authLogin: AuthUserLoginUseCase, private readonly authRegister: AuthRegisterUserUseCase){}

    public async login(userCred: AuthUserLoginInDTO): Promise<AuthUserLoginOutDTO>{
        return await this.authLogin.execute(userCred);
    }

    public async register(userRegister: RegisterUserInDTO): Promise<RegisterUserOutDTO>{
        return await this.authRegister.execute(userRegister);
    }
}