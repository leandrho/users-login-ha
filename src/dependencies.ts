import { IPasswordHasher } from "./lib/shared/application/security/IPasswordHasher";
import { BcryptPasswordHasher } from "./lib/shared/infrastructure/security/BCryptPasswordHasher";
import { IUserRepository } from "./lib/user/domain/repositories/IUserRepository";
// import { InMemoryUserRepository } from "./lib/user/infrastructure/persistence/InMemoryUserRepository";
import { UserCreateUseCase, UserDeleteUseCase, UserUpdatePasswordUseCase, UserUpdateProfileUseCase } from "./lib/user/application/use-cases";
import { UserQueryService } from "./lib/user/application/query-services";
import { UserService } from "./lib/user/infrastructure/http/UserService";
import { UserController } from "./lib/user/infrastructure/http/UserController";
import { UserRouter } from "./lib/user/infrastructure/http/UserRouter";
import { AuthUserLoginUseCase } from './lib/auth/application/use-cases/AuthUserLoginUseCase';
import { IAuthTokenService } from "./lib/shared/application/security/IAuthTokenService";
import { JwtAuthTokenService } from "./lib/shared/infrastructure/security/JwtAuthTokenService";
import { AuthService } from "./lib/auth/infrastructure/http/AuthService";
import { AuthController } from "./lib/auth/infrastructure/http/AuthController";
import { AuthRouter } from "./lib/auth/infrastructure/http/AuthRouter";
import { PrismaUserRepository } from "./lib/user/infrastructure/persistence/PrismaUserRepository";
import { AuthRegisterUserUseCase } from './lib/auth/application/use-cases/AuthRegisterUserUseCase';
import { RequestPasswordResetUseCase } from "./lib/auth/application/use-cases/RequestPasswordResetUseCase";
import { ResetPasswordUseCase } from './lib/auth/application/use-cases/ResetPasswordUseCase';
import { IPasswordResetTokenRepository } from "./lib/auth/domain/repository/IPasswordResetTokenRepository";
import { InMemoryPasswordResetTokenRepository } from "./lib/auth/infrastructure/persistence/InMemoryPasswordResetTokenRepository";
import { IEmailService } from "./lib/shared/application/email/IEmailService";
import { NodemailerEmailService } from "./lib/shared/infrastructure/email/NodemailerEmailService";


// const userRepository: IUserRepository = new InMemoryUserRepository();
const userRepository: IUserRepository = new PrismaUserRepository();
const passHasher: IPasswordHasher = new BcryptPasswordHasher();
const emailService: IEmailService = new NodemailerEmailService();

const uCreateUC: UserCreateUseCase = new UserCreateUseCase(userRepository, passHasher);
const uProfileUC: UserUpdateProfileUseCase = new UserUpdateProfileUseCase(userRepository);
const uPassUC: UserUpdatePasswordUseCase = new UserUpdatePasswordUseCase(userRepository, passHasher);
const uQueryServ: UserQueryService = new UserQueryService(userRepository);
const uDeleteUC: UserDeleteUseCase = new UserDeleteUseCase(userRepository);
const uService: UserService = new UserService(uCreateUC, uProfileUC, uPassUC, uQueryServ, uDeleteUC);
const userController: UserController = new UserController(uService);
const userRouter: UserRouter = new UserRouter(userController);

const authTokenService: IAuthTokenService = new JwtAuthTokenService();
const passResetTokenRepository: IPasswordResetTokenRepository = new InMemoryPasswordResetTokenRepository();
const authUserLoginUC: AuthUserLoginUseCase = new AuthUserLoginUseCase(userRepository, passHasher, authTokenService);
const authRegisterUserUC: AuthRegisterUserUseCase = new AuthRegisterUserUseCase(userRepository, passHasher);
const requestPasswordResetUC: RequestPasswordResetUseCase = new RequestPasswordResetUseCase(passResetTokenRepository, userRepository, emailService);
const resetPasswordUC: ResetPasswordUseCase = new ResetPasswordUseCase(passResetTokenRepository, passHasher, userRepository);
const authService: AuthService = new AuthService(authUserLoginUC, authRegisterUserUC, requestPasswordResetUC, resetPasswordUC);
const authController: AuthController = new AuthController(authService);
const authRouter: AuthRouter = new AuthRouter(authController);

export {
    userRouter,
    authRouter,
    authTokenService,
}