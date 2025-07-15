import { UserId, UserEmail, UserFullname, UserPassword, UserRole, UserCreatedAt, UserLastLogin } from "../value-objects";

export class User{
    
    constructor(
        public readonly id: UserId, 
        public readonly fullName: UserFullname,
        public readonly email: UserEmail,
        public readonly password: UserPassword,
        public readonly role: UserRole,
        public readonly createdAt: UserCreatedAt,
        public lastLogin?: UserLastLogin,
    ){}
    
    public login(): void {
        this.lastLogin = new UserLastLogin(new Date());
    }

    public toPrimitives():{ id: string, fullName: string, email: string, password: string, role: string, createdAt: Date, lastLogin?: Date } {
        return {
            id: this.id.value(),
            fullName: this.fullName.value(),
            email: this.email.value(),
            password: this.password.value(),
            role: this.role.value(),
            createdAt: this.createdAt.value(),
            lastLogin: this.lastLogin?.value(),
        }
    }

}