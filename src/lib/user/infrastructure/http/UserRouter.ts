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
        this.router.post('/', authorizeRoleMid([UserRoleEnum.ADMIN]), (req, res) => this.userController.create(req, res));
        this.router.put('/:id', authorizeRoleMid([UserRoleEnum.ADMIN, UserRoleEnum.USER]), (req, res) => this.userController.updateProfile(req, res));
        this.router.patch('/:id', authorizeRoleMid([UserRoleEnum.ADMIN, UserRoleEnum.USER]), (req, res) => this.userController.updatePassword(req, res));
        this.router.get('/email', authorizeRoleMid([UserRoleEnum.ADMIN]), (req, res) => this.userController.findByEmail(req, res));
        this.router.get('/:id', authorizeRoleMid([UserRoleEnum.ADMIN, UserRoleEnum.USER]), (req, res) => this.userController.findById(req, res));
        this.router.get('/', authorizeRoleMid([UserRoleEnum.ADMIN]), (req, res) => this.userController.findAll(req, res));
    }

}