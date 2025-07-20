import { Router } from "express";

import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserController } from "./UserController";
import { UserService } from "./UserService";
import { UserCreateUseCase, UserUpdateProfileUseCase, UserUpdatePasswordUseCase } from "../../application/use-cases";
import { UserQueryService } from "../../application/query-services";
import { InMemoryUserRepository } from "../persistence/InMemoryUserRepository";
import { IPasswordHasher } from "src/lib/shared/application/security/IPasswordHasher";
import { BcryptPasswordHasher } from "src/lib/shared/infrastructure/BCryptPasswordHasher";

const userRepository: IUserRepository = new InMemoryUserRepository();
const passHasher: IPasswordHasher = new BcryptPasswordHasher();

const uCreateUC: UserCreateUseCase = new UserCreateUseCase(userRepository, passHasher);
const uProfileUC: UserUpdateProfileUseCase = new UserUpdateProfileUseCase(userRepository);
const uPassUC: UserUpdatePasswordUseCase = new UserUpdatePasswordUseCase(userRepository, passHasher);
const uQueryServ: UserQueryService = new UserQueryService(userRepository);

const uService: UserService = new UserService(uCreateUC, uProfileUC, uPassUC, uQueryServ);
const userController: UserController = new UserController(uService);

const userRouter: Router = Router();

userRouter.post('/', (req, res) => userController.create(req, res));
userRouter.put('/:id', (req, res) => userController.updateProfile(req, res));
userRouter.patch('/:id', (req, res) => userController.updatePassword(req, res));
userRouter.get('/:id', (req, res) => userController.findById(req, res));
userRouter.get('/email', (req, res) => userController.findByEmail(req, res));
userRouter.get('/', (req, res) => userController.findAll(req, res));

export default userRouter;