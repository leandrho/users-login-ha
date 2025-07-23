import { StringValueObject } from '../../../shared/domain/value-objects/';
import { ValidationResult } from "../../../shared/domain/types";

export enum UserRoleEnum {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}
export class UserRole extends StringValueObject{

    constructor(role: string){
        super(role);
    }

    public isValid(value: string): ValidationResult {
        
        if(!Object.values(UserRoleEnum).includes(value as UserRoleEnum))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid user role', propName: 'UserRole', value: value}};

        return {isValid: true};
    }

    public isAdmin(): boolean {
        return this.value() === UserRoleEnum.ADMIN;
    }

    public isUser(): boolean {
        return this.value() === UserRoleEnum.USER;
    }

    public isGuest(): boolean {
        return this.value() === UserRoleEnum.GUEST;
    }

}