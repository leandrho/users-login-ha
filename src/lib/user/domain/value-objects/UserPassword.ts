
import { ValidationResult } from "src/lib/shared/domain/types";
import { StringValueObject } from "src/lib/shared/domain/value-objects/";

export class UserPassword extends StringValueObject{

    private static readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    constructor(password: string){
        super(password);
    }

    public isValid(value: string): ValidationResult {

        if(!UserPassword.passwordRegex.test(value))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid pasword', propName: 'UserPassword', value: value} }
        
        return {isValid: true}
    }

}
