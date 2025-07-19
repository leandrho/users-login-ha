import { StringValueObject } from "src/lib/shared/domain/value-objects/StringValueObject";
import { ValidationResult } from "src/lib/shared/domain/types";

export class UserRole extends StringValueObject{
    
    private static readonly validRoles: string[] = ['admin', 'user', 'guest'];

    constructor(role: string){
        super(role);
    }

    public isValid(value: string): ValidationResult {
        
        if(!UserRole.validRoles.includes(value))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid user role', propName: 'UserRole', value: value}};

        return {isValid: true};
    }


}