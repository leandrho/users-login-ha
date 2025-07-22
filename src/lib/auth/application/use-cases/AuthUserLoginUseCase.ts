import { IUserRepository } from "../../../user/domain/repositories/IUserRepository";
import { AuthUserLoginInDTO, AuthUserLoginOutDTO } from "../dtos";
import { User } from "../../../user/domain/entities";
import { UserEmail } from "../../../user/domain/value-objects";
import { IPasswordHasher } from "../../../shared/application/security/IPasswordHasher";
import { IAuthTokenService } from "../../../shared/application/security/IAuthTokenService";
import { AuthenticationFailedError } from "../../domain/errors/AuthenticationFailedError";

export class AuthUserLoginUseCase {
    constructor(
        private readonly userRepository: IUserRepository, 
        private passwordHasher: IPasswordHasher, 
        private readonly authTokenService: IAuthTokenService
    ){}
    
    public async execute(authCred: AuthUserLoginInDTO): Promise<AuthUserLoginOutDTO>{

            const user: User | null = await this.userRepository.findByEmail(new UserEmail(authCred.email));
            if(!user)
                throw new AuthenticationFailedError();

            if(!user.status.isLoginAllowed())
                throw new AuthenticationFailedError();
            
            const isValidPasswd = await this.passwordHasher.compare(authCred.password, user.password.value());
            if(!isValidPasswd)
                throw new AuthenticationFailedError();

            const token = this.authTokenService.generateToken(user.id.value(), user.role.value());
            
            user.login();
            await this.userRepository.save(user);

            return { token };

    }
}