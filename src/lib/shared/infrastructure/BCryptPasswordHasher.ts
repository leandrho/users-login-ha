
import * as bcrypt from 'bcryptjs'

import { IPasswordHasher } from "../application/security/IPasswordHasher";

export class BcryptPasswordHasher implements IPasswordHasher{

    constructor(private readonly saltRounds: number = 10){}
    
    public async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }
    public async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}