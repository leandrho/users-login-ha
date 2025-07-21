import { StringValueObject } from '../../../shared/domain/value-objects/';
import { ValidationResult } from "../../../shared/domain/types";

export class UserEmail extends StringValueObject{

    private static readonly emailRegExp: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    constructor(email: string){
        super( email );
    }

    public isValid(value: string): ValidationResult {

        if(!UserEmail.emailRegExp.test(value))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid email', propName: 'UserEmail', value: value} }
        
        return {isValid: true}
    }
    

}
