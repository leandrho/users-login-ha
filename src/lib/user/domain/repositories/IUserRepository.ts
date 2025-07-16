import { User } from "../entities/User";
import { UserEmail, UserId } from "../value-objects";

export interface IUserRepository {

    save(user: User): Promise<void>;
    delete(id: UserId): Promise<void>;
    findById(id: UserId): Promise<User | null>;
    findByEmail(email: UserEmail): Promise<User | null>;
    findAll(): Promise<User[]>;

}