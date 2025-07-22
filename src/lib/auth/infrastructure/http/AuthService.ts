import { AuthUserLoginInDTO, AuthUserLoginOutDTO } from '../../application/dtos';
import { AuthUserLoginUseCase } from '../../application/use-cases/AuthUserLoginUseCase';

export class AuthService {
    constructor(private readonly authLogin: AuthUserLoginUseCase){}

    public async login(userCred: AuthUserLoginInDTO): Promise<AuthUserLoginOutDTO>{
        return await this.authLogin.execute(userCred);
    }

}