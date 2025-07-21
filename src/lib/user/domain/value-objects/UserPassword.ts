import { StringValueObject } from '../../../shared/domain/value-objects/';
import { ValidationResult } from "../../../shared/domain/types";

export class UserPassword extends StringValueObject{

    //private static readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    constructor(password: string){
        super(password);
    }

    public isValid(value: string): ValidationResult {
        if(value.length < 8)
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid pasword', propName: 'UserPassword', value: value} }
        
        return {isValid: true}
    }

}
