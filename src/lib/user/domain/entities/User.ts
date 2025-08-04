import { UserLoginNotAllowedError } from "../errors/UserLoginNotAllowedError";
import { UserStatusUpdateNotAllowedError } from "../errors/UserStatusUpdateNotAllowedError";
import { UserId, UserEmail, UserFirstName, UserLastName, UserPassword, UserRole, UserCreatedAt, UserLastLogin, UserStatus } from "../value-objects";

export class User{
    
    constructor(
        public readonly id: UserId, 
        public readonly email: UserEmail,
        public readonly createdAt: UserCreatedAt,
        public firstName: UserFirstName,
        public lastName: UserLastName,
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

    public updateFirstName(firstname: UserFirstName): void{
        this.firstName = firstname;
    }

    public updateLastName(lastname: UserLastName): void{
        this.lastName = lastname;
    }

    public updateRole(newRole: UserRole): void{
        this.role = newRole;
    }

    public toPrimitives():{ id: string, firstName: string, lastName: string, email: string, password: string, role: string, createdAt: Date, status: string, lastLogin?: Date } {
        return {
            id: this.id.value(),
            firstName: this.firstName.value(),
            lastName: this.lastName.value(),
            email: this.email.value(),
            password: this.password.value(),
            role: this.role.value(),
            createdAt: this.createdAt.value(),
            status: this.status.value(),
            lastLogin: this.lastLogin?.value(),
        }
    }

    public static fromPrimitives( id: string, firstName: string, lastName: string, email: string, password: string, role: string, createdAt: Date, status: string, lastLogin?: Date ): User {
        return new User(
            new UserId(id),
            new UserEmail(email),
            new UserCreatedAt(createdAt),
            new UserFirstName(firstName),
            new UserLastName(lastName),
            new UserPassword(password),
            new UserRole(role),
            new UserStatus(status),
            lastLogin ? new UserLastLogin(lastLogin) : undefined,
        );
    }

    public static createNew( firstName: string, lastName: string, email: string, password: string, role: string ): User{

        return new User(
            UserId.randomId(),
            new UserEmail(email),
            new UserCreatedAt(new Date()),
            new UserFirstName(firstName),
            new UserLastName(lastName),
            new UserPassword(password),
            new UserRole(role),
            new UserStatus('active'),
            undefined,
        );

    }

}