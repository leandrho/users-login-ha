import { StringValueObject } from '../../../shared/domain/value-objects/';
import { ValidationResult } from "../../../shared/domain/types";

export class UserStatus extends StringValueObject{
    
    private static readonly status: string[] = ['active', 'inactive', 'banned'];
    
    constructor(status: string){
        super(status);
    }
    
    public isValid(value: string): ValidationResult {

        if(!UserStatus.status.includes(value))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid status', propName: 'UserStatus', value: value}};
        
        return {isValid: true};
    }

    public isLoginAllowed(): boolean { 
        return this.value() === 'active';
    }
    
    public isBanned(): boolean {
        return this.value() === 'banned';
    }

}