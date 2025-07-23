
import express, {Application, Request, Response, NextFunction} from "express";
import { json } from "body-parser";
import dotenv from "dotenv";

import { IPasswordHasher } from "./lib/shared/application/security/IPasswordHasher";
import { BcryptPasswordHasher } from "./lib/shared/infrastructure/security/BCryptPasswordHasher";
import { IUserRepository } from "./lib/user/domain/repositories/IUserRepository";
import { InMemoryUserRepository } from "./lib/user/infrastructure/persistence/InMemoryUserRepository";
import { UserCreateUseCase, UserUpdatePasswordUseCase, UserUpdateProfileUseCase } from "./lib/user/application/use-cases";
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
import { authenticateTokenMid } from './lib/shared/infrastructure/http/middlewares/authenticateTokenMid';

dotenv.config();

const userRepository: IUserRepository = new InMemoryUserRepository();
const passHasher: IPasswordHasher = new BcryptPasswordHasher();

const uCreateUC: UserCreateUseCase = new UserCreateUseCase(userRepository, passHasher);
const uProfileUC: UserUpdateProfileUseCase = new UserUpdateProfileUseCase(userRepository);
const uPassUC: UserUpdatePasswordUseCase = new UserUpdatePasswordUseCase(userRepository, passHasher);
const uQueryServ: UserQueryService = new UserQueryService(userRepository);
const uService: UserService = new UserService(uCreateUC, uProfileUC, uPassUC, uQueryServ);
const userController: UserController = new UserController(uService);
const userRouter: UserRouter = new UserRouter(userController);

const authTokenService: IAuthTokenService = new JwtAuthTokenService();
const authUserLoginUseCase: AuthUserLoginUseCase = new AuthUserLoginUseCase(userRepository, passHasher, authTokenService);
const authService: AuthService = new AuthService(authUserLoginUseCase);
const authController: AuthController = new AuthController(authService);
const authRouter: AuthRouter = new AuthRouter(authController);

const app: Application = express();

app.use(json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error Handler:", err); // Loggea el error para depuración
    // Si el error ya tiene un status code (ej. de un middleware anterior), úsalo.
    // De lo contrario, asume 500 Internal Server Error.
    const status = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred.';
    res.status(status).json({ message: message });
});

app.use('/api/users/', authenticateTokenMid(authTokenService), userRouter.router);
app.use('/api/auth/', authRouter.router)

const port: number = parseInt(process.env.PORT ?? "3000");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
