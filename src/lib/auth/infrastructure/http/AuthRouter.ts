import { Router } from "express";
import { AuthController } from "./AuthController";

export class AuthRouter{

    public router: Router = Router();

    constructor(private readonly authController: AuthController){
        this.initialize();
    }

    private initialize(): void{
        this.router.post('/login', (req, res, next) => this.authController.login(req, res, next));
        this.router.post('/register', (req, res, next) => this.authController.register(req, res, next));
        this.router.post('/forgot-password', (req, res, next) => this.authController.requestPasswordReset(req, res, next));
        this.router.post('/reset-password', (req, res, next) => this.authController.resetPassword(req, res, next));
    }

}