import { UserLoginNotAllowedError } from "../errors/UserLoginNotAllowedError";
import { UserStatusUpdateNotAllowedError } from "../errors/UserStatusUpdateNotAllowedError";
import { UserId, UserEmail, UserFullname, UserPassword, UserRole, UserCreatedAt, UserLastLogin, UserStatus } from "../value-objects";

export class User{
    
    constructor(
        public readonly id: UserId, 
        public readonly email: UserEmail,
        public readonly createdAt: UserCreatedAt,
        public fullName: UserFullname,
        public password: UserPassword,
        public role: UserRole,
        public status: UserStatus,
        public lastLogin?: UserLastLogin,
    ){}
    
    public login(): void {
        if (!this.status.isLoginAllowed()) {
            throw new UserLoginNotAllowedError('User is not allowed to login');
        }
        this.lastLogin = new UserLastLogin(new Date());
    }

    public updateStatus(newstatus: UserStatus): void{
        if(this.status.isBanned() || !newstatus.isLoginAllowed()){
            throw new UserStatusUpdateNotAllowedError('User is not allowed to update status');
        }
        this.status = newstatus;
    }

    public updatePassword(newPassword: UserPassword): void{
        this.password = newPassword;
    }

    public updateFullname(fullname: UserFullname): void{
        this.fullName = fullname;
    }

    public updateRole(newRole: UserRole): void{
        this.role = newRole;
    }

    public toPrimitives():{ id: string, fullName: string, email: string, password: string, role: string, createdAt: Date, status: string, lastLogin?: Date } {
        return {
            id: this.id.value(),
            fullName: this.fullName.value(),
            email: this.email.value(),
            password: this.password.value(),
            role: this.role.value(),
            createdAt: this.createdAt.value(),
            status: this.status.value(),
            lastLogin: this.lastLogin?.value(),
        }
    }

    public static fromPrimitives( id: string, fullname: string, email: string, password: string, role: string, createdAt: Date, status: string, lastLogin?: Date ): User {
        return new User(
            new UserId(id),
            new UserEmail(email),
            new UserCreatedAt(createdAt),
            new UserFullname(fullname),
            new UserPassword(password),
            new UserRole(role),
            new UserStatus(status),
            lastLogin ? new UserLastLogin(lastLogin) : undefined,
        );
    }

    public static createNew( fullname: string, email: string, password: string, role: string ): User{

        return new User(
            UserId.randomId(),
            new UserEmail(email),
            new UserCreatedAt(new Date()),
            new UserFullname(fullname),
            new UserPassword(password),
            new UserRole(role),
            new UserStatus('active'),
            undefined,
        );

    }

}