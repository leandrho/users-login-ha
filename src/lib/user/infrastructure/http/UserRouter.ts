import { Router } from "express";
import { UserController } from "./UserController";

export class UserRouter{
    public readonly router: Router;

    constructor(private readonly userController: UserController){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post('/', (req, res) => this.userController.create(req, res));
        this.router.put('/:id', (req, res) => this.userController.updateProfile(req, res));
        this.router.patch('/:id', (req, res) => this.userController.updatePassword(req, res));
        this.router.get('/:id', (req, res) => this.userController.findById(req, res));
        this.router.get('/email', (req, res) => this.userController.findByEmail(req, res));
        this.router.get('/', (req, res) => this.userController.findAll(req, res));
    }

}