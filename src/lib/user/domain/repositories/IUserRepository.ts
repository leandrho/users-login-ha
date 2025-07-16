import { User } from "../entities/User";
import { UserEmail, UserId } from "../value-objects";

export interface IUserRespository {

    save(user: User): Promise<void>;
    delete(id: UserId): Promise<void>;
    findById(id: UserId): Promise<User | undefined>;
    findByEmail(email: UserEmail): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    
}