import { StringValueObject } from '../../../shared/domain/value-objects';
import { ValidationResult } from "../../../shared/domain/types";

export class UserLastName extends StringValueObject{
    
    private static readonly regexNombre: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/;

    constructor(fullname: string){
        super(fullname);
    }

    public isValid(value: string): ValidationResult{
        if(!value) 
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid lastname - cannot be empty', propName: 'UserLastName', value: value}};

        if(!UserLastName.regexNombre.test(value))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid lastname - contains invalid characters', propName: 'UserLastName', value: value}};

        if(value.length > 50)
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid lastname - too long', propName: 'UserLastName', value: value}};

        return {isValid: true}
    }

}
