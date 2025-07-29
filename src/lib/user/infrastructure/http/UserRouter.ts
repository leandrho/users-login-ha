import { Router } from "express";
import { UserController } from "./UserController";
import { authorizeRoleMid } from "../../../shared/infrastructure/http/middlewares/authorizeRolesMid";
import { UserRoleEnum } from "../../domain/value-objects";

export class UserRouter{
    public readonly router: Router;

    constructor(private readonly userController: UserController){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.delete('/:id',authorizeRoleMid([UserRoleEnum.ADMIN]), (req, res, next) => this.userController.delete(req, res, next));
        this.router.get('/email', authorizeRoleMid([UserRoleEnum.ADMIN]), (req, res, next) => this.userController.findByEmail(req, res, next));
        this.router.get('/:id', authorizeRoleMid([UserRoleEnum.ADMIN, UserRoleEnum.USER]), (req, res, next) => this.userController.findById(req, res, next));
        this.router.post('/', authorizeRoleMid([UserRoleEnum.ADMIN]), (req, res, next) => this.userController.create(req, res, next));
        this.router.put('/:id', authorizeRoleMid([UserRoleEnum.ADMIN, UserRoleEnum.USER]), (req, res, next) => this.userController.updateProfile(req, res, next));
        this.router.patch('/:id', authorizeRoleMid([UserRoleEnum.ADMIN, UserRoleEnum.USER]), (req, res, next) => this.userController.updatePassword(req, res, next));
        this.router.get('/', authorizeRoleMid([UserRoleEnum.ADMIN]), (req, res, next) => this.userController.findAll(req, res, next));
    }

}