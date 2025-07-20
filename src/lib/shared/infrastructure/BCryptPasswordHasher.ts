import { IPasswordHasher } from "../application/security/IPasswordHasher";

export class BcryptPasswordHasher implements IPasswordHasher{

    constructor(){}
    
    public async hash(password: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    public async compare(password: string, hash: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}