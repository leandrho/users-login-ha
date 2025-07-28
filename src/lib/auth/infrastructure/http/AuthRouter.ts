import { Router } from "express";
import { AuthController } from "./AuthController";

export class AuthRouter{

    public router: Router = Router();

    constructor(private readonly authController: AuthController){
        this.initialize();
    }

    private initialize(): void{
        this.router.post('/login', (req, res) => this.authController.login(req, res));
        this.router.post('/register', (req, res) => this.authController.register(req, res));
        this.router.post('/reset-password', (req, res) => this.authController.resetPassword(req, res));
    }

}