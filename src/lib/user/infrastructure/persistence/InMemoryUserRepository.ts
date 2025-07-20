import { User } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserId, UserEmail } from "../../domain/value-objects";

export class InMemoryUserRepository implements IUserRepository{

    private userStorage: Map<string, User> = new Map<string, User>();
    
    public async save(user: User): Promise<void> {
        this.userStorage.set(user.id.value(), user);
    }

    public async delete(id: UserId): Promise<void> {
        this.userStorage.delete(id.value());
    }

    public async findById(id: UserId): Promise<User | null> {
        return this.userStorage.get(id.value()) ?? null;
    }

    public async findByEmail(email: UserEmail): Promise<User | null> {
        for (const [ , value ] of this.userStorage) {
            if (value.email.value() === email.value()) {
                return value;
            }
        }
        return null;
    }

    public async findAll(): Promise<User[]> {
        return Array.from(this.userStorage.values());
    }
    
}