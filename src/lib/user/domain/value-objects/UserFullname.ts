import { StringValueObject } from '../../../shared/domain/value-objects/';
import { ValidationResult } from "../../../shared/domain/types";

export class UserFullname extends StringValueObject{
    
    private static readonly regexNombre: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/;

    constructor(fullname: string){
        super(fullname);
    }

    public isValid(value: string): ValidationResult{
        if(!value) 
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid fullname - cannot be empty', propName: 'UserFullname', value: value}};

        if(!UserFullname.regexNombre.test(value))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid fullname - contains invalid characters', propName: 'UserFullname', value: value}};

        if(value.length > 50)
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid fullname - too long', propName: 'UserFullname', value: value}};

        return {isValid: true}
    }

}
