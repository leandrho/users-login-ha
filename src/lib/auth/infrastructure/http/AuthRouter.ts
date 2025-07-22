import { Router } from "express";
import { AuthController } from "./AuthController";

export class AuthRouter{

    public router: Router = Router();

    constructor(private readonly authController: AuthController){
        this.initilize();
    }

    private initilize(): void{
        this.router.post('/login', (req, res) => this.authController.login(req, res));
    }

}